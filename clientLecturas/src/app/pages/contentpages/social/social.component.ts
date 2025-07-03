import { Component } from '@angular/core';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { AuthService } from '../../../services/auth.service';
import { Form, NgForm } from '@angular/forms';
import { ComentarioModel } from '../../../models/comentario.model';


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
  comentario: string = ""; 


  constructor(private _lecturasBBDDService: LecturasBBDDService,
              private _authService: AuthService
  ) {
  }



  ngOnInit() {
    this.getSeguidos(); 
    this.getActividad(); 
    //Obtenemos el id logueado para ocultar el boton de seguir si coincide consigo mismo
    const email = localStorage.getItem("email");
    this._authService.getIdByEmail(email).subscribe(
      (resp) => {
        this.idLogueado = resp; 
        if(email)
          this.emailLogueado = email; 
      },
      (err) => {
        console.log(err); 
      }
    ) 
    this.getSeguidores(); 
  }



  getActividad() {
    this.posts = []; 
    this._lecturasBBDDService.getListLibrosUsuarios().subscribe(
      (resp) => { 
        resp.forEach((libro: any) => {
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
          if(postLibros.resena=="")
              this.posts.push(postLibros); 
          //Si la propiedad resena no está vacía se pasarán los datos a la parte de reseña (en función del tipo)
          if (postResena.resena != "")
              this.posts.push(postResena); 
        });
      },
      (err) => {
        console.log(err);
      }
    );
    console.log("Posts: ", this.posts); 
    return this.posts;  
  }


  getSeguidos() {
    this.seguidos = []; 
    this._lecturasBBDDService.getSeguidos().subscribe(
      (resp) => {
        resp.forEach((id:any) => {
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
        resp.forEach((id:any) => {
           this._authService.getUserById(id).subscribe(
             (usuario: any) => {
               console.log("Usuario:",usuario); 
               if (usuario != undefined) {
                 this.seguidores.push(usuario);
                 console.log("Seguidores:",this.seguidores); 
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


  guardarComentario(formulario: NgForm, tipo: string) {
    console.log(formulario.form.value); 
    console.log(tipo); 

    var nuevoComentario = new ComentarioModel(); 
    
    nuevoComentario = {
      _idUsuario: this.idLogueado,
      _idLibro:   "",
      texto:      formulario.value,
      fecha:      new Date(),
      tipo:       tipo
    }


         
    

  }






}
