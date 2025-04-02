import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { LibroModel } from '../../../models/libro.model';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  librosNuevos: { id: any; info: any; }[] = []; 
  cargados: boolean = false; 
  disponibles: boolean = true; 
  libro: LibroModel = new LibroModel(); 
  librosGuardados: any[] = []; 
  usuarioID: string = ""; 
  recomendaciones: any[] = []; 


  constructor(private _librosService: LibrosService, private  _lecturasBBDDService: LecturasBBDDService) {
    this.getLibrosNuevos(); 
    this.getInfoUsuario(); 
  }

 

  getLibrosNuevos() {
    this._librosService.getLibrosNuevos().subscribe(
     (resp: any) => {
        for (let i = 0; i < resp.items.length; i++) {
           const libroInfo = {
                id: resp.items[i].id,
                info: resp.items[i].volumeInfo
          };
          this.librosNuevos.push(libroInfo);
        }
        this.cargados = true;
      },
      (error) => {
        console.log("Ha fallado", error); 
        this.disponibles = false;
        this.cargados = true;
      }
    )
  }


  getInfoUsuario() {
    this._lecturasBBDDService.getListLibros(this.usuarioID).subscribe(
      (resp) => {
        this.getRecomendaciones(resp[0].categorias); 
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getRecomendaciones(tematica: string) {
    this._librosService.getLibrosByTematica(tematica).subscribe(
      (resp) => {
        this.recomendaciones = resp.items; 
        console.log(resp); 
      }, 
      (err) => {
        console.log(err); 
      }
    ); 
  }








}
