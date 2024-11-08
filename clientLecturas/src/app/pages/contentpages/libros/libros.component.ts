import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ColeccionModel } from '../../../models/coleccion.model';
import { EstadoLibroService } from '../../../services/estado-libro.service';
import { EditarLibroComponent } from '../editar-libro/editar-libro.component';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  librosGuardados: any[] = [];
  librosSeleccionados: any[] = []; 
  librosAMostrar: any[] = []; 
  mostrarForm: boolean = false; 
  colecciones: ColeccionModel[] = []; 
  coleccion: ColeccionModel = new ColeccionModel(); 

  constructor(private _estadoLibroService: EstadoLibroService) {
    this.mostrarLibros(); 
    this.mostrarColecciones(); 
  }


 
  //LIBROS
  mostrarLibros() {
    var guardados = localStorage.getItem('librosGuardados');
    if (guardados) {
      this.librosGuardados.push(JSON.parse(guardados));
      this.librosAMostrar = this.librosGuardados;
    }
  }


  /*Buscador*/
  //Busva libros dentro de los que hay guardados
  buscarLibrosGuardados(termino: string) {
    for (var i = 0; i < this.librosGuardados[0].length; i++){
      if (this.librosGuardados[0][i].titulo===termino || this.librosGuardados[0][i].autores===termino) {
        console.log("encontrado"); 
        var libroSeleccionado = this.librosGuardados[0][i];
        this.librosSeleccionados.push(libroSeleccionado); 
      } 
      else {
         this.mostrarLibros();
      }
    }
    this.librosAMostrar = [];
    this.librosAMostrar.push(this.librosSeleccionados); 
    console.log(this.librosSeleccionados); 
  }


  //COLECCIONES
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
     this.librosGuardados.forEach((elem: any) => {
      if (elem.coleccion == nombreColeccion) {
        console.log(elem.coleccion); 
      }
    })
   // localStorage.setItem("librosGuardados", JSON.stringify(this.librosGuardados)); 
  }


  //FORMULARIO
  mostrarFormulario(id:string, titulo: string, estado:string, coleccion: string) {
    this.mostrarForm = true; 
    this._estadoLibroService.setIdLibro(id); 
    this._estadoLibroService.setTituloLibro(titulo); 
    this._estadoLibroService.setEstadoLibro(estado); 
    this._estadoLibroService.setColeccionLibro(coleccion);
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
