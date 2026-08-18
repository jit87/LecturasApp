import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AbstractLecturasBBDDService } from '../../../abstracts/AbstractLecturasBBDDService';
import { AbstractAuthService } from '../../../abstracts/AbstractAuthService';

interface DatosPerfil {
  nombre: string;
  usuario: string;
  imagen: string;
  bio: string;
  librosLeidos: string[];
  librosPendientes: string[];
  seguidores: string[];
  seguidos: string[];
  _id: string;
}

@Component({
  selector: 'app-publicoperfil',
  templateUrl: './publicoperfil.component.html',
  styleUrl: './publicoperfil.component.css'
})


export class PublicoperfilComponent {

  idUsuario: any = "";
  seguidos: any[] | undefined;
  DatosPerfil: DatosPerfil = {
    nombre: "",
    usuario: "",
    imagen: "",
    bio: "",
    librosLeidos: [],
    librosPendientes: [],
    seguidores: [],
    seguidos: [],
    _id: ""
  };
  idLogueado: any;
  mostrarBotonAgregar: number = -1;
  listaSeguidores: any = [];
  posts: any[] = [];
  listaSeguidos: any = [];

  //Para que sea opcional aumentar la visualización de seguidos.
  seguidosVisibles: any[] = [];
  seguidoresVisibles: any[] = [];
  tamanioSeguidos: number = 3;
  tamanioSeguidores: number = 3;


  constructor(
    private _authService: AbstractAuthService,
    private router: ActivatedRoute,
    private _lecturasBBDDService: AbstractLecturasBBDDService,
    private location: Location
  ) {
    //Obtenemos el id pasado por la url del navegador
    this.router.params.subscribe(
      (params: any) => {
        this.idUsuario = params.id;
        this.cargarDatos(this.idUsuario);
      }
    )
    //Obtenemos el id logueado
    const email = localStorage.getItem("email");
    this._authService.getIdByEmail(email).subscribe(
      (resp) => {
        this.idLogueado = resp;
      },
      (err) => {
        console.log(err);
      }
    )
    this.compruebaSiEsSeguido(this.idUsuario);
    this.getActividad(this.idUsuario);
  }

  cargarDatos(idUsuario: string) {
    this._authService.getUserById(idUsuario).subscribe(
      (resp: any) => {
        this.DatosPerfil.nombre = resp.nombre;
        this.DatosPerfil.imagen = resp.imagen;
        this.DatosPerfil.seguidores = resp.seguidores;
        this.DatosPerfil.seguidos = resp.seguidos;
        this.DatosPerfil._id = resp._id;
        this.DatosPerfil.bio = resp.bio;
        this.DatosPerfil.librosLeidos = resp.librosLeidos;
      }, (err) => {
        console.log("Error de obtención de datos", err);
      })
    this.getSeguidoresById(this.idUsuario);
    this.getSeguidosById(this.idUsuario);
    this.getActividad(this.idUsuario);
  }

  regresar() {
    this.location.back();
  }

  //Si es seguido el id se oculta el botón de seguir en la vista
  compruebaSiEsSeguido(idUsuario: string) {
    this._lecturasBBDDService.getSeguidos().subscribe(
      (resp) => {
        let result = resp.includes(idUsuario);
        if (!result && idUsuario !== this.idLogueado) {
          this.mostrarBotonAgregar = 1;
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  seguir(idSeguido: any) {
    this._lecturasBBDDService.setSeguido(idSeguido).subscribe(
      (resp) => {
        console.log("Añadido", resp);
        this.cargarDatos(this.idUsuario);
      },
      (err) => {
        console.log(err);
      }
    )
    this.mostrarBotonAgregar = -1;
  }

  noseguir(idSeguido: any) {
    this._lecturasBBDDService.deleteSeguido(idSeguido).subscribe(
      (resp) => {
        console.log("Has dejado de seguir al usuario" + idSeguido, resp);
        this.cargarDatos(this.idUsuario);
      },
      (err) => {
        console.log(err);
      }
    )
    this.mostrarBotonAgregar = 1;
  }

  getSeguidoresById(id: any) {
    this.listaSeguidores = [];
    this.actualizarSeguidoresVisibles();
    this._lecturasBBDDService.getSeguidoresById(id).subscribe(
      (resp) => {
        resp.forEach((id: any) => {
          this._authService.getUserById(id).subscribe(
            (usuario: any) => {
              if (usuario != undefined) {
                this.listaSeguidores.push(usuario);
                this.actualizarSeguidoresVisibles();
              }
            }
          )
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getSeguidosById(id: any) {
    this.listaSeguidos = [];
    this.actualizarSeguidosVisibles();
    this._lecturasBBDDService.getSeguidosById(id).subscribe(
      (resp) => {
        resp.forEach((id: any) => {
          this._authService.getUserById(id).subscribe(
            (usuario: any) => {
              if (usuario != undefined) {
                this.listaSeguidos.push(usuario);
                this.actualizarSeguidosVisibles();
              }
            }
          )
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  /*Métodos y funciones para mostrar de manera opcional más seguidos/seguidores*/
  /*Seguidos*/
  actualizarSeguidosVisibles() {
    this.seguidosVisibles = this.listaSeguidos.slice(0, this.tamanioSeguidos);
  }

  verMasSeguidos() {
    this.tamanioSeguidos += 5;
    this.actualizarSeguidosVisibles();
  }

  get hayMasSeguidos(): boolean {
    return this.seguidosVisibles.length < this.listaSeguidos.length;
  }

  /*Seguidores*/
  actualizarSeguidoresVisibles() {
    this.seguidoresVisibles = this.listaSeguidores.slice(0, this.tamanioSeguidores);
  }

  verMasSeguidores() {
    this.tamanioSeguidores += 5;
    this.actualizarSeguidoresVisibles();
  }

  get hayMasSeguidores(): boolean {
    return this.seguidoresVisibles.length < this.listaSeguidores.length;
  }


  getActividad(idUsuario: string) {
    this.posts = [];
    this._lecturasBBDDService.getListLibrosUsuarios().subscribe(
      (resp) => {
        resp.forEach((libro: any) => {
          if (libro._idUsuario == idUsuario) {
            let postLibros = {
              APIid: libro.APIid,
              _id: libro._id,
              _idUsuario: libro._idUsuario,
              nombreUsuario: "",
              imagenUsuario: "",
              titulo: libro.titulo,
              autores: libro.autores,
              editor: libro.editor,
              descripcion: libro.descripcion || "",
              imagen: libro.imagen || "default.png",
              resena: libro.resena || "",
              tipo: "Libro"
            };
            let postResena = {
              APIid: libro.APIid,
              _id: libro._id,
              _idUsuario: libro._idUsuario,
              nombreUsuario: "",
              imagenUsuario: "",
              resena: libro.resena || "",
              titulo: libro.titulo,
              tipo: "Resena",
            };

            this._authService.getUserById(libro._idUsuario).subscribe(
              (usuario: any) => {
                postLibros.nombreUsuario = usuario.nombre;
                postLibros.imagenUsuario = usuario.imagen;
                postResena.nombreUsuario = usuario.nombre;
                postResena.imagenUsuario = usuario.imagen;
              },
              (err) => {
                console.log(err);
              }
            );
            //Si el libro no tiene reseña, es que se ha añadido recientemente, luego se muestra la actualización del libro
            if (postLibros.resena == "")
              this.posts.push(postLibros);
            //Si la propiedad resena no está vacía se pasarán los datos a la parte de reseña (en función del tipo)
            if (postResena.resena != "")
              this.posts.push(postResena);
          }
        }
        );
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.posts);
  }





}
