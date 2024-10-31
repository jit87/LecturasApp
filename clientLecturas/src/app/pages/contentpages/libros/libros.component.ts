import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ColeccionModel } from '../../../models/coleccion.model';

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

  constructor(private _librosService: LibrosService) {
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
    this.mostrarColecciones();
  }


  //FORMULARIO
  mostrarFormulario(id:string, titulo: string, estado:string) {
    this.mostrarForm = true; 
    this._librosService.setIdLibro(id); 
    this._librosService.setTituloLibro(titulo); 
    this._librosService.setEstadoLibro(estado); 
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
