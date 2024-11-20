import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; 
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroForm: FormGroup;
  error: boolean = false; 

    constructor(
        private fb: FormBuilder,
        private _authService: AuthService,
        private router: Router,
       // private toastr: ToastrService
      ) {
        this.registroForm = this.fb.group({
          nombre: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]]
        });
  }
  
  
  onSubmit() {
    if (this.registroForm.valid) {
      const { nombre, email, password } = this.registroForm.value;
      this._authService.registro(nombre, email, password).subscribe(
        () => {
          this.router.navigate(['/home']);
        //  this.toastr.success('Inicie sesión','Registro exitoso'); 
        },
        error => {
          console.error('Error durante el registro:', error);
          this.error = true; 
        }
      );
    }
  }

  
  
}