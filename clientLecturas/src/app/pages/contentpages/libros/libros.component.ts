import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ColeccionModel } from '../../../models/coleccion.model';
import { EstadoLibroService } from '../../../services/estado-libro.service';
import { EditarLibroComponent } from '../editar-libro/editar-libro.component';
import { LibroModel } from '../../../models/libro.model';

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

  constructor(private _estadoLibroService: EstadoLibroService) {
    this.mostrarLibros(); 
    this.mostrarColecciones(); 
  }


 
  //LIBROS
  //Cambiar el acceso del lS a la BBDD cuando se cree el backend
  mostrarLibros() {
    var guardados = localStorage.getItem('librosGuardados');
    if (guardados) {
      this.librosGuardados.push(JSON.parse(guardados));
      this.librosAMostrar = this.librosGuardados;
    }
  }


  /*Buscador*/
  //Busca libros dentro de los que hay guardados
  buscarLibrosGuardados(termino: string) {
    if(this.libroEncontrado==false)
      for (var i = 0; i < this.librosGuardados[0].length; i++){
        if (this.librosGuardados[0][i].titulo===termino || this.librosGuardados[0][i].autores===termino) {
          console.log("encontrado"); 
          var libroSeleccionado = this.librosGuardados[0][i];
          this.librosSeleccionados.push(libroSeleccionado); 
          this.libroEncontrado = true; 
          break; 
        } 
        else if (this.librosGuardados[0][i].coleccion == termino) {
          console.log("encontrado"); 
          var libroSeleccionado = this.librosGuardados[0][i];
          this.librosSeleccionados.push(libroSeleccionado); 
          this.libroEncontrado = true; 
        }
        else {
          this.mostrarLibros();
        }
      }
    this.librosAMostrar = [];
    this.librosAMostrar.push(this.librosSeleccionados); 
     if(termino == "" || termino== null) {
      this.mostrarLibros(); 
    }
  }

  //Cambiar el acceso del lS a la BBDD cuando se cree el backend
  eliminarLibro(index: number) {
    for (var i = 0; i < this.librosGuardados[0].length; i++){
      console.log(this.librosGuardados[0][i]); 
      this.librosGuardados[0].splice(index, 1);
      break; 
    }
    localStorage.setItem("librosGuardados", JSON.stringify(this.librosGuardados[0]));
    this.mostrarLibros();
  }


  //COLECCIONES
  //Cambiar el acceso del lS a la BBDD cuando se cree el backend
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
