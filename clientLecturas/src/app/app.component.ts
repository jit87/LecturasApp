import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clientLecturas';
  email: string | null = ""; 
  datos: any; 

  constructor(private _authService: AuthService) {
    this.cargarDatos(); 
  }

  cargarDatos() {
    this.email = localStorage.getItem("email"); 
    this._authService.getUserByEmail(this.email).subscribe(
      (resp: any) => {
        this.datos = resp; 
        this.cargarApariencia(); 
      }, (err) => {
        console.log("Error de obtención de datos", err); 
      })
  }

  
  cargarApariencia() {
      if (this.datos.apariencia == "oscura") {
        document.body.style.backgroundColor = "rgb(236, 238, 239);"; 
        document.body.classList.remove("modo-oscuro");
    } else {
        document.body.style.backgroundColor = "#102A2D"; 
        document.body.classList.add("modo-oscuro"); 
    }
  }



}
