import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AbstractLibrosService } from '../../../abstracts/AbstractLibrosService';
import { AbstractAuthService } from '../../../abstracts/AbstractAuthService';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {


  libros: { id: any; info: any; }[] = [];
  librosGuardados: any[] = [];
  cargando: boolean = false;
  disponibles: boolean = true;
  usuarioID: String = "";


  constructor(
    private _librosService: AbstractLibrosService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _authService: AbstractAuthService) {

  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Parámetros recibidos:', params);
        this.getLibros(params[('termino')]);
      }
    )
  }


  //Usamos promesa porque la obtención del ID es asíncrona y si la queremos recuperar en guardarEstadoLibros dará undefined si no usamos promesas
  async getUsuarioID() {
    const email = localStorage.getItem("email");
    return new Promise((resolve, reject) => {
      this._authService.getIdByEmail(email).subscribe(
        (resp: any) => {
          this.usuarioID = resp;
          console.log('Usuario ID obtenido:', this.usuarioID);
          resolve(this.usuarioID);
        },
        (err) => {
          console.error('Error al obtener el usuarioID:', err);
          reject(err);
        }
      );
    });
  }


  getLibros(termino: string) {
    this.cargando = true;
    //Limpiamos la búsqueda anterior antes de realizar nueva búsqueda
    this.libros = [];
    this._librosService.getLibros(termino).subscribe(
      (resp: any) => {
        for (let i = 0; i < resp.items.length; i++) {
          const libroInfo = {
            id: resp.items[i].id,
            info: resp.items[i].volumeInfo
          };
          this.libros.push(libroInfo);
          this.cargando = false;
        }
      },
      (error) => {
        console.log("Ha fallado", error);
        this.disponibles = false;
      }
    );
    console.log(this.libros);
  }

  regresar() {
    this.location.back();
  }




}
