import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { LibroModel } from '../../../models/libro.model';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { AuthService } from '../../../services/auth.service';


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
  tematicaRecomendaciones: string = "";  


  constructor(private _librosService: LibrosService,
              private _lecturasBBDDService: LecturasBBDDService,
              private _authService: AuthService)
  {
    this.getLibrosNuevos(); 
    this.getUsuarioID(); 
  }

 
  //Obtiene los libros nuevos que haya publicado la API
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


  getUsuarioID() {
      const email = localStorage.getItem("email"); 
      this._authService.getUserByEmail(email).subscribe(
        (resp: any) => {
          this.usuarioID = resp._id;
          this.getInfoUsuario(); 
        },
        (err) => {
          console.log(err); 
        }
    ); 
  }


  getInfoUsuario() {  
    this._lecturasBBDDService.getListLibros(this.usuarioID).subscribe(
      (resp) => {
        this.librosGuardados = resp;
        console.log("Libros guardados por el usuario: ",this.librosGuardados); 
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
        for (let i = 0; i < resp.items.length; i++) {
          this.recomendaciones.push({
            id: resp.items[i].id,
            info: resp.items[i].volumeInfo
          });
          this.tematicaRecomendaciones = tematica; 
          //Si el libro está guardado se elimina de los recomendados
          this.recomendaciones = this.recomendaciones.filter(recomendacion =>
              !this.librosGuardados.some(libro => libro.APIid === recomendacion.id)
          );
        }
      },
      (err) => {
        console.log("Ha fallado", err); 
      }
    )
  }














}
