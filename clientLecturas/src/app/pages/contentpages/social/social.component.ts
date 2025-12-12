import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgForm, NgModel } from '@angular/forms';
import { ComentarioModel } from '../../../models/comentario.model';
import { AbstractLecturasBBDDService } from '../../../abstracts/AbstractLecturasBBDDService';
import { AbstractAuthService } from '../../../abstracts/AbstractAuthService';


interface ComentarioVista extends ComentarioModel {
  nombreUsuario: string;
  imagenUsuario: string;
}

interface PostLibro {
  APIid: string;
  _id: string;
  _idUsuario: string;
  nombreUsuario: string;
  imagenUsuario: string;
  titulo: string;
  autores: string[];
  editor: string;
  descripcion: string;
  imagen: string;
  resena: string;
  tipo: "libro";
  comentarios: ComentarioVista[];
}

interface PostResena {
  APIid: string;
  _id: string;
  _idUsuario: string;
  nombreUsuario: string;
  imagenUsuario: string;
  resena: string;
  titulo: string;
  tipo: "resena";
  comentarios: ComentarioVista[];
}



@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent {

  posts: any[] = [];
  seguidos: any[] = [];
  seguidores: any[] = [];
  idLogueado: string = "";
  emailLogueado: string = "";
  mostrarBotonAgregar: number = -1;
  resenas: string[] = [];
  comentarioActivo: number = 0;
  cajaCerrada: boolean = true;
  comentarioTexto: NgModel | any;
  comentariosGuardados: any[] = [];
  nombreUsuario: string = "";
  imagenUsuario: string = "";
  cargados: boolean = false;


  constructor(
    private _lecturasBBDDService: AbstractLecturasBBDDService,
    private _authService: AbstractAuthService
  ) {
    this.getActividad();
    setTimeout(() => {
      this.cargados = true;
    }, 1000);
  }



  ngOnInit() {
    this.getSeguidos();
    this.getActividad();
    //Obtenemos el id logueado para ocultar el boton de seguir si coincide consigo mismo
    const email = localStorage.getItem("email");
    this._authService.getIdByEmail(email).subscribe(
      (resp) => {
        this.idLogueado = resp;
        this.getNombreUsuario(this.idLogueado);
        if (email)
          this.emailLogueado = email;
      },
      (err) => {
        console.log(err);
      }
    )
    this.getSeguidores();
  }



  //MURO
  getActividad() {
    this.cargados = false;
    this.posts = [];
    this._lecturasBBDDService.getListLibrosUsuarios().subscribe(
      (resp) => {
        resp.forEach((libro: any) => {
          const postLibros: PostLibro = {
            APIid: libro.APIid,
            _id: libro._id,
            _idUsuario: libro._idUsuario,
            nombreUsuario: '',
            imagenUsuario: '',
            titulo: libro.titulo,
            autores: libro.autores,
            editor: libro.editor,
            descripcion: libro.descripcion || '',
            imagen: libro.imagen || 'default.png',
            resena: libro.resena || '',
            tipo: 'libro',
            comentarios: [] as ComentarioVista[]
          };

          const postResena: PostResena = {
            APIid: libro.APIid,
            _id: libro._id,
            _idUsuario: libro._idUsuario,
            nombreUsuario: '',
            imagenUsuario: '',
            resena: libro.resena || '',
            titulo: libro.titulo,
            tipo: 'resena',
            comentarios: [] as ComentarioVista[]
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
          this.getComentarios(postLibros, postResena);
        });
      },
      (err) => {
        console.log(err);
      }
    );
    return this.posts;
  }



  //SEGUIDOS Y SEGUIDORES
  getSeguidos() {
    this.seguidos = [];
    this._lecturasBBDDService.getSeguidos().subscribe(
      (resp) => {
        resp.forEach((id: any) => {
          this._authService.getUserById(id).subscribe(
            (usuario: any) => {
              if (usuario != undefined) {
                this.seguidos.push(usuario);
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


  getSeguidores() {
    this.seguidores = [];
    this._lecturasBBDDService.getSeguidores().subscribe(
      (resp) => {
        resp.forEach((id: any) => {
          this._authService.getUserById(id).subscribe(
            (usuario: any) => {
              console.log("Usuario:", usuario);
              if (usuario != undefined) {
                this.seguidores.push(usuario);
                console.log("Seguidores:", this.seguidores);
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


  guardarComentario(formulario: NgForm, tipo: string, _id: string, post: any) {
    //Datos de comentario que guardamos en la colección comentarios
    var nuevoComentarioBase = new ComentarioModel();
    nuevoComentarioBase = {
      _idUsuario: this.idLogueado,
      _idLibro: _id,
      texto: formulario.value.comentarioTexto,
      fecha: new Date(),
      tipo: tipo
    }
    this._lecturasBBDDService.addComentario(nuevoComentarioBase).subscribe(
      (resp) => {
        console.log("Comentario añadido", resp);
        //Necesitamos añadir los datos de imagen y nombre aparte porque estos no se guardan en la colección comentarios
        //Copiamos en comentarioAmpliado el nuevoComentarioBase y le pasamos los datos de nombre y usuario, 
        //luego se mostrará de manera reactiva el comentario con la imagen y nombre correspondientes
        const comentarioAmpliado: ComentarioVista = {
          ...nuevoComentarioBase,
          nombreUsuario: this.nombreUsuario,
          imagenUsuario: this.imagenUsuario
        };
        post.comentarios.push(comentarioAmpliado);
        post.comentarios = [...post.comentarios];
      },
      (err) => {
        console.log(err);
      }
    )
  }


  getNombreUsuario(_idUsuario: string) {
    this._authService.getUserById(_idUsuario).subscribe(
      (resp) => {
        console.log("Nombre encontrado:", resp);
        this.nombreUsuario = resp.nombre;
        this.imagenUsuario = resp.imagen;
      },
      (err) => {
        console.log(err);
      }
    )
  }


  //Obtiene los comentarios asociados a cada post
  getComentarios(postLibros: PostLibro, postResena: PostResena) {
    //Si el libro no tiene reseña, es que se ha añadido recientemente, luego se muestra la actualización del libro
    //Además obtenemos los comentarios asociados al libro
    if (postLibros.resena == "") {
      this._lecturasBBDDService.getComentarios(postLibros._id, postLibros.tipo).subscribe(
        (resp: any) => {
          if (resp != "") {
            postLibros.comentarios = resp;
            postLibros.comentarios.forEach((comentario, index) => {
              this._authService.getUserById(comentario._idUsuario).subscribe({
                next: (usuario) => {
                  postLibros.comentarios[index].nombreUsuario = usuario.nombre;
                  postLibros.comentarios[index].imagenUsuario = usuario.imagen;
                },
                error: (err) => console.log(err)
              });
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.posts.push(postLibros);
    }
    //Si la propiedad resena no está vacía se pasarán los datos a la parte de reseña (en función del tipo)
    //Además obtenemos los comentarios asociados a la reseña
    if (postResena.resena != "") {
      this._lecturasBBDDService.getComentarios(postResena._id, postResena.tipo).subscribe(
        (resp: any) => {
          if (resp != "") {
            postResena.comentarios = resp;
            postResena.comentarios.forEach((comentario, index) => {
              this._authService.getUserById(comentario._idUsuario).subscribe({
                next: (usuario) => {
                  postResena.comentarios[index].nombreUsuario = usuario.nombre;
                  postResena.comentarios[index].imagenUsuario = usuario.imagen;
                },
                error: (err) => console.log(err)
              });
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.posts.push(postResena);
    }
  }







}
