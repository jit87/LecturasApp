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
    if (termino == '') {
      this.regresar();
    }
    this.cargando = true;
    this.libros = [];
    this._librosService.getLibros(termino).subscribe(
      (resp: any) => {
        const items = resp.items || [];
        for (let i = 0; i < items.length; i++) {
          const volumen = items[i].volumeInfo || {};
          const libroInfo = {
            id: items[i].id,
            //Aseguramos que tenga un objeto info consistente con thumbnail y smallThumbnail
            info: {
              title: volumen.title || 'Sin título',
              authors: volumen.authors || ['Autor desconocido'],
              description: volumen.description || '',
              imageLinks: {
                smallThumbnail: volumen.imageLinks?.thumbnail || volumen.imageLinks?.smallThumbnail || 'assets/imagen-no-disponible.png',
                thumbnail: volumen.imageLinks?.thumbnail || 'assets/imagen-no-disponible.png'
              }
            }
          };
          this.libros.push(libroInfo);
        }
        this.cargando = false;
      },
      (error) => {
        console.log("Ha fallado", error);
        this.cargando = false;
        this.disponibles = false;
      }
    );
  }

  regresar() {
    this.location.back();
  }

}