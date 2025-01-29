import { ChangeDetectorRef, Component } from '@angular/core';
import { EstadoLibroService } from '../../../services/estado-libro.service';
import { AuthService } from '../../../services/auth.service';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  librosGuardados: any[] = [];
  librosSeleccionados: any[] = []; 
  librosAMostrar: any[] = []; 
  libroEncontrado: boolean = false; 
  mostrarForm: boolean = false; 
  usuarioID: string = ""; 
  colecciones: string[] = [];
  mostrarBoton: boolean = false; 
  librosPaginados: any[] = [];
  paginaActual: number = 1;
  totalPaginas: number = 1; 
  librosPorPagina: number = 5; 
  

  constructor(private _estadoLibroService: EstadoLibroService,
    private _authService: AuthService,
    private _lecturasBBDDService: LecturasBBDDService,
    private toastr: ToastrService) { 
    this.getUsuarioID(); 
  }


  //Obtenemos ID de usuario necesario para mostrar los libros y colecciones guardados
  getUsuarioID() {
    const email = localStorage.getItem("email"); 
    this._authService.getUserByEmail(email).subscribe(
      (resp: any) => {
        this.usuarioID = resp._id; 
        this.mostrarLibros();
        this.mostrarColecciones(); 
      }
    ); 
  }


 //LIBROS
 //Obtiene los libros guardados en la BBDD de MongoDB
 mostrarLibros() {
    this._lecturasBBDDService.getListLibros(this.usuarioID).subscribe(
      (resp: any) => {
        this.librosGuardados = resp;
        this.librosAMostrar = this.librosGuardados;
        this.totalPaginas = Math.ceil(this.librosAMostrar.length / this.librosPorPagina);
        this.actualizarPagina();
      },
      (error) => {
        console.log(error); 
      }
    )
  }


  /*Buscador*/
  //Busca libros dentro de los que hay guardados
  buscarLibrosGuardados(termino: string) {
    if (this.libroEncontrado == false) {
      for (var i = 0; i < this.librosGuardados.length; i++){
        if (
          this.librosGuardados[i].titulo == termino 
          || this.librosGuardados[i].autores[0] == termino
          || this.librosGuardados[i].titulo.match(termino)
        ) {
          var libroSeleccionado = this.librosGuardados[i];
          this.librosSeleccionados.push(libroSeleccionado); 
          this.libroEncontrado = true;  
        } 
        else if (this.librosGuardados[i].coleccion==termino) { 
          var libroSeleccionado = this.librosGuardados[i];
          this.librosSeleccionados.push(libroSeleccionado); 
          this.libroEncontrado = true;  
        }
        else if (this.librosGuardados[i].estado==termino) {
          var libroSeleccionado = this.librosGuardados[i];
          this.librosSeleccionados.push(libroSeleccionado); 
          this.libroEncontrado = true; 
        }
        else if (this.librosGuardados[i].editor==termino) {
          var libroSeleccionado = this.librosGuardados[i];
          this.librosSeleccionados.push(libroSeleccionado); 
          this.libroEncontrado = true; 
        }
      }
    }
    this.librosAMostrar = [];
    this.librosAMostrar = this.librosSeleccionados; 
  }



  limpiarBuscador(termino: string) {
    if (termino == "" || termino == null) {
      this.librosSeleccionados = []; 
      this.mostrarLibros(); 
      this.libroEncontrado = false; 
    }
  }



  //Elimina libro de la BBDD
  eliminarLibro(libroId: string) {
    if (confirm("¿Está seguro de eliminarlo?")) {
      this._lecturasBBDDService.deletelibro(libroId).subscribe(
        (resp: any) => {
          console.log(resp, "Libro eliminado");
          this.librosGuardados = this.librosGuardados.filter(libro => libro._id !== libroId);
          this.librosAMostrar = this.librosGuardados;
          this.toastr.info('Ha sido eliminado!', 'Eliminado!'); 
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }



  //COLECCIONES
  mostrarColecciones() {
    this._lecturasBBDDService.getListColecciones(this.usuarioID).subscribe(
      (resp) => {
        console.log(resp); 
        this.colecciones = resp; 
      },
      (error) => {
        console.log(error); 
      }
    )
  }

  //Añade la colección en la BBDD de MongoDB
  crearColeccion(coleccion: string) {
    if (!coleccion || coleccion.trim() === '') {
      return; 
    }
    for (var i = 0; i <= this.colecciones.length;i++){
      if (coleccion == this.colecciones[i]) {
        this.toastr.error('Ya hay una colección con el mismo nombre');
        return; 
      }
    }
    this._lecturasBBDDService.addColeccion(coleccion).subscribe(
      (resp) => {
        console.log("Colección añadida", resp);
        this.toastr.info('Colección añadida');
        this.mostrarColecciones(); 
      },
      (error) => {
        console.log("Fallo al añadir la colección", error); 
      }
    )
  }


  eliminarColeccion(index: number, event: Event) {
    event.stopPropagation();
    if (confirm("¿Está seguro de eliminarlo?")) {
      this._lecturasBBDDService.deleteColeccion(index).subscribe(
        (resp) => {
          console.log("Eliminada la coleccion", resp);
          this.toastr.info("Colección eliminada");
          this.mostrarColecciones();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }


  filtrarPorColeccion(coleccion: string) {
    this.buscarLibrosGuardados(coleccion);  
    this.colecciones = [coleccion]; 
    this.mostrarBoton = true; 
  }


  mostrarTodasColecciones() {
    this.mostrarColecciones();
    this.mostrarLibros(); 
    this.limpiarBuscador(""); 
    this.mostrarBoton = false;
  }


  //FORMULARIO
  //Comunicamos los datos del libro de la tabla al componente del formulario
  mostrarFormulario(id:string, titulo: string, estado:string, coleccion: string) {
    this.mostrarForm = true; 
    this._estadoLibroService.setIdLibro(id); 
    this._estadoLibroService.setTituloLibro(titulo); 
    this._estadoLibroService.setEstadoLibro(estado); 
    this._estadoLibroService.setColeccionLibro(coleccion);
    this.mostrarLibros(); 
    this.mostrarColecciones(); 
  }

  cerrarFormulario() {
    this.mostrarForm = false; 
    this.mostrarLibros(); 
  }

  recibirConfEditado(confirmado: boolean) {
   if(confirmado)
    this.mostrarLibros(); 
  }  



  //PAGINACION
  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.librosPorPagina;
    const fin = inicio + this.librosPorPagina;
    this.librosAMostrar = this.librosGuardados.slice(inicio, fin);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPagina();
    }
  }

  paginaSiguiente() {
     if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPagina();
    }
  }





}
