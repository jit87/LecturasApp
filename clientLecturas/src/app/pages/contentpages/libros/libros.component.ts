import { ChangeDetectorRef, Component } from '@angular/core';
import { ColeccionModel } from '../../../models/coleccion.model';
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
  colecciones: ColeccionModel[] = []; 
  coleccion: ColeccionModel = new ColeccionModel(); 
  usuarioID: string = ""; 


  constructor(private _estadoLibroService: EstadoLibroService,
    private _authService: AuthService,
    private _lecturasBBDDService: LecturasBBDDService,
    private toastr: ToastrService) {
    this.mostrarColecciones(); 
    this.getUsuarioID(); 
    this.mostrarLibros(); 
  }
  


  //Obtenemos ID de usuario necesario para mostrar los libros guardados
  getUsuarioID() {
    const email = localStorage.getItem("email"); 
    this._authService.getUserByEmail(email).subscribe(
      (resp: any) => {
        this.usuarioID = resp._id; 
        this.mostrarLibros();
      }
    ); 
  }


 //LIBROS
 //Obtiene los libros guardados en la BBDD de MongoDB
 async mostrarLibros() {
    this._lecturasBBDDService.getListLibros(this.usuarioID).subscribe(
      (resp: any) => {
        this.librosGuardados = resp;
        this.librosAMostrar = this.librosGuardados;
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
    this.librosAMostrar= this.librosSeleccionados; 
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
      this._lecturasBBDDService.deletelibro(libroId).subscribe(
        (resp: any) => {
          console.log(resp, "Libro eliminado");
           this.librosGuardados = this.librosGuardados.filter(libro => libro._id !== libroId);
           this.librosAMostrar = this.librosGuardados;
           this.toastr.success('Ha sido eliminado!', 'Eliminado!');
        },
        (error) => {
          console.log(error); 
        }
   );
  }


  //COLECCIONES
  //PENDIENTE: actualizar para que se guarden en el Backend
  mostrarColecciones() {
    var coleccionGuardada = localStorage.getItem("coleccionesGuardadas");
    if(coleccionGuardada)
      this.colecciones = JSON.parse(coleccionGuardada);
  }


  crearColeccion(coleccion: any) {
    if (coleccion.value=="") {
      return; 
    }
    this.coleccion = {
      _id: "default", 
      _idUsuario: "default",
      libros: [],
      nombre: coleccion.value
    }
    this.colecciones.push(this.coleccion); 
    localStorage.setItem("coleccionesGuardadas", JSON.stringify(this.colecciones)); 
  }


  eliminarColeccion(index: number) {
    //Filtramos la coleccion que pasamos como parámetro
    var coleccionesModificadas = this.colecciones.filter((elem) => elem.nombre !== this.colecciones.at(index)?.nombre);
    localStorage.setItem("coleccionesGuardadas", JSON.stringify(coleccionesModificadas)); 
    //Eliminamos la coleccion de los libros a los que está asignada
    this.eliminarAsignacionColeccion(index);
    this.mostrarColecciones();
  }


  eliminarAsignacionColeccion(index: number) {
    var nombreColeccion = this.colecciones.at(index)?.nombre; 
    for (var i = 0; i < this.librosGuardados[0].length; i++) {
      if (this.librosGuardados[0][i].coleccion== nombreColeccion) {
        this.librosGuardados[0][i].coleccion = "";
      }
    }
   localStorage.setItem("librosGuardados", JSON.stringify(this.librosGuardados[0])); 
  }
  

  filtrarPorColeccion(coleccion: ColeccionModel) {
    this.buscarLibrosGuardados(coleccion.nombre);  
  }


  mostrarTodasColecciones() {
    this.mostrarColecciones();
    this.mostrarLibros(); 
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
  }

  cerrarFormulario() {
    this.mostrarForm = false; 
    this.mostrarLibros(); 
  }

  recibirConfEditado(confirmado: boolean) {
   if(confirmado)
    this.mostrarLibros(); 
  }  


}
