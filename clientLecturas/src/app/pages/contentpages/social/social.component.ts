import { Component } from '@angular/core';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { AuthService } from '../../../services/auth.service';
import { UsuarioModel } from '../../../models/usuario.model';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent {

  posts: any[] = [];
  seguidos: any[] = []; 
  idLogueado: string = ""; 
  emailLogueado: string = ""; 



  constructor(private _lecturasBBDDService: LecturasBBDDService,
              private _authService: AuthService
  ) {
  }



  ngOnInit() {
    this.getActividad(); 
    this.getSeguidos(); 
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
  }


  seguir(idSeguido: any) {
    this._lecturasBBDDService.setSeguido(idSeguido).subscribe(
      (resp) => {
        console.log("Añadido", resp);
      },
      (err) => {
        console.log(err); 
      }
    )   
  }



  getActividad() {
    this.posts = []; 
    this._lecturasBBDDService.getListLibrosUsuarios().subscribe(
      (resp) => { 
        resp.forEach((libro: any) => {
          let post = {
            APIid: libro.APIid,
            _id: libro._id,
            _idUsuario: libro._idUsuario,
            nombreUsuario: "", 
            imagenUsuario: "",
            titulo: libro.titulo,
            autores: libro.autores,
            editor: libro.editor,
            descripcion: libro.descripcion || "",
            imagen: libro.imagen || "default.png"
          };
          this._authService.getUserById(libro._idUsuario).subscribe(
            (usuario: any) => {
              post.nombreUsuario = usuario.nombre;  
              post.imagenUsuario = usuario.imagen; 
            },
            (err) => {
              console.log(err);
            }
          );
          this.posts.push(post);
        });
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.posts); 
  }


  getSeguidos() {
    this.seguidos = []; 
    this._lecturasBBDDService.getSeguidos().subscribe(
      (resp) => {
        resp.forEach((id:any) => {
           this._authService.getUserById(id).subscribe(
             (usuario: any) => {
               if(usuario!=undefined)
                this.seguidos.push(usuario); 
              }
            )
        });
      },
      (err) => {
        console.log(err); 
      }
    )
  }








}
