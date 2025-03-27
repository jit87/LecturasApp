import { ChangeDetectorRef, Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  DatosPerfil: any = []; 
  email: string | null = ""; 

  //Propiedades de la contraseña
  actualPassword: string = "";
  nuevaPassword: string = ""; 
  password: string = ""; 
  show: boolean = false;

  //Propiedades del nombre
  nuevoNombre: string = ""; 
  nombre: string = ""; 

  //Propiedades de bio
  nuevaBio: string = ""

  //Propiedades del email
  nuevoEmail: string = ""; 

  //Prodiedades de formularios
  mostrarFormularioPass: boolean = false; 
  mostrarFormularioNom: boolean = false; 
  mostrarFormularioEma: boolean = false; 
  mostrarFormularioImg: boolean = false; 
  mostrarFormularioBio: boolean = false; 

  //Spinner
  loading: boolean = false;
  
  //Propiedades de imagen
  imagePreview: string | ArrayBuffer | null = null; 
  file: File | null = null; 

  //Propiedad del toggle button
  isChecked: boolean = false;


  constructor(private _authService: AuthService,
              private toastr: ToastrService,
  ) {
    this.cargarDatos(); 
  }

  ngOnInit() {
    const estado = localStorage.getItem('toggleState');
    if (estado == 'true') {
        this.isChecked = true; 
    } else {
        this.isChecked = false; 
    }
  }


  cargarDatos() {
    this.email = localStorage.getItem("email"); 
    this._authService.getUserByEmail(this.email).subscribe(
      (resp: any) => {
        this.DatosPerfil = resp;  
      }, (err) => {
        console.log("Error de obtención de datos", err); 
      })
  }



  //FORMULARIOS
  /*Imagen*/

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
      };
      //Leer el archivo como una URL de datos
      reader.readAsDataURL(this.file); 
    }
  }


  async onUpload(): Promise<void> {
      //Hay que convertirlo a string antes de subir la imagen
      if (this.file && this.email) {
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          if(this.email)
            this._authService.saveImage(this.email, reader.result as string).subscribe(
              (resp) => {
                this.toastr.success('Imagen subida');
                this.cargarDatos();
                //Avisamos al servicio que indica al navbar que cambie la imagen de perfil
                this._authService.actualizarImagenPerfil(reader.result as string);
              },
              (err) => console.log("Error al subir la imagen:", err)
            );
            this.imagePreview = null;
            this.file = null;
        } ;
      }
  }


  abrirFormularioImg() {
    this.mostrarFormularioImg = true; 
  }


  cerrarFormularioImg() {
    this.mostrarFormularioImg = false; 
  }



  
  /*Bio*/ 
  cambiarBio() {
    this.loading = false; 
    if (this.email) {
      this._authService.modificarBio(this.email, this.nuevaBio).subscribe(
        (resp: any) => {
          if (resp) {
            console.log("Bio modificada", resp); 
            this.toastr.success('La bio ha sido modificada', 'Bio modificada');
            this.cargarDatos();
          }
        },
        (err) => {
          console.log(err); 
          this.toastr.error('El usuario no existe', 'Error');
        }
      )
    }
  }

  abrirFormularioBio() {
     this.mostrarFormularioBio = true; 
  }

  cerrarFormularioBio() {
     this.mostrarFormularioBio = false; 
  }



  
 /*Password*/
 cambiarPassword() {
   this.loading = false; 
    if(this.email)
      this._authService.modificarPassword(this.email, this.actualPassword, this.nuevaPassword).subscribe(
        (resp: any) => {
          if (resp) {
            console.log("Contraseña cambiada", resp); 
            this.toastr.success('La contraseña ha sido cambiada', 'Contraseña cambiada');
            this.cargarDatos(); 
          }
        },
        (err) => {
          console.log(err); 
          this.toastr.error(err);
        }
      )
  }


  cerrarFormularioPass() {
    this.mostrarFormularioPass = false; 
  }
 

  abrirFormularioPass() {
    this.mostrarFormularioPass = true; 
  }


  visualizarPasswordActual() {
    let input = document.getElementById('actualPassword') as HTMLInputElement;
    if (input) {
      input.type = input.type === 'text' ? 'password' : 'text';
    }
  }


  visualizarPasswordNueva() {
    let input = document.getElementById('nuevaPassword') as HTMLInputElement;
    if (input) {
      input.type = input.type === 'text' ? 'password' : 'text';
    }
  }
    



  /*Nombre*/
  cambiarNombre() {
    this.loading = false; 
    if (this.email) {
      console.log(this.email); 
      this._authService.modificarNombre(this.email, this.nuevoNombre).subscribe(
        (resp: any) => {
          if (resp) {
            console.log("Nombre modificado", resp); 
            this.toastr.success('El nombre ha sido modificado', 'Nombre modificado');
            this.cargarDatos();
          }
        },
        (err) => {
          console.log(err); 
          this.toastr.error('El usuario no existe', 'Error');
        }
      )
    }
  }

  abrirFormularioNom() {
    this.mostrarFormularioNom = true; 
  }

  cerrarFormularioNom() {
    this.mostrarFormularioNom = false; 
  }



  /*Email*/ 
  cambiarEmail() {
    this.loading = false; 
    if(this.email)
      this._authService.modificarEmail(this.email, this.nuevoEmail).subscribe(
        (resp: any) => {
          if (resp) {
            console.log("Email modificado", resp); 
            this.toastr.success('El email ha sido modificado', 'Email modificado');
            this.cargarDatos();
          }
        },
        (err) => {
          console.log(err); 
          this.toastr.error('El usuario no existe', 'Error');
        }
      )
  }

  abrirFormularioEma() {
    this.mostrarFormularioEma = true; 
  }

 cerrarFormularioEma() {
    this.mostrarFormularioEma = false; 
  }



  /*Apariencia*/
  cambiarApariencia() {
    var aparienciaValue = ""; 
    
    if (this.DatosPerfil.apariencia == "oscura") {
       aparienciaValue = "clara"; 
       this.isChecked = false;
       localStorage.setItem('toggleState', this.isChecked.toString());
    }
    else if (this.DatosPerfil.apariencia == "clara" || this.DatosPerfil.apariencia == "") {
       aparienciaValue = "oscura";
       this.isChecked = true;
       localStorage.setItem('toggleState', this.isChecked.toString());
    }
    if (this.email) {
        this._authService.modificarApariencia(this.email, aparienciaValue).subscribe(
          (resp) => {
            console.log(resp); 
            this.cargarDatos(); 
          },
          (err) => {
            console.log(err); 
        }
      )
    }    
  }


  /*//////////////*/

  eliminarCuenta(id: any) {
    this.cargarDatos(); 
    console.log(id); 
    if(this.email)
      this._authService.eliminarUsuario(id).subscribe(
        (resp) => {
          console.log("Usuario eliminado: ", resp); 
        },
        (err) => {
          console.log(err); 
        }
      ); 
  }

  
  
  
  


}
