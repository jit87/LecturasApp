import { Component } from '@angular/core';
import { AbstractAuthService } from './abstracts/AbstractAuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clientLecturas';
  email: string | null = "";
  datos: any;


  constructor(private _authService: AbstractAuthService) {
    this.cargarDatos();
  }

  ngOnInit() {
    this._authService.perfilApariencia$.subscribe((response: string) => {
      console.log("Apariencia test: ", response);
      if (response === "clara") {
        document.body.classList.remove("modo-oscuro");
      }
      if (response === "oscura") {
        document.body.classList.add("modo-oscuro");
      }
    })
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
    if (this.datos.apariencia == "clara") {
      document.body.classList.remove("modo-oscuro");
    }
    if (this.datos.apariencia == "oscura") {
      document.body.classList.add("modo-oscuro");
    }
    this.cargarDatos();
  }



}
