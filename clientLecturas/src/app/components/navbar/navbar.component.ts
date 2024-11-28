import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  autenticado: boolean | any = false;
  isAuthenticated: boolean = false;

  constructor(private router: Router,
              private _authService: AuthService

  ) {
     if(this._authService.isAuthenticated()) {
      this.autenticado = true;
    }
     this.checkAuthentication();
   }


  
  //Buscador de libros
  getInfoLibro(termino: string) {
    this.router.navigate(['/buscador', termino]);
  }

  ngOnInit(){}


  ngDoCheck(): void {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const token = localStorage.getItem('auth-token');
    this.isAuthenticated = !!token; 
    if (this.isAuthenticated) {
      this.autenticado = true; 
    }
  }

  
  logout() {
    this._authService.logout(); 
    this.autenticado = false; 
    //Eliminamos los datos guardados en el navegador
    localStorage.clear();
    //localStorage.removeItem("email");
    //localStorage.removeItem("auth-token");
  }
  



}
