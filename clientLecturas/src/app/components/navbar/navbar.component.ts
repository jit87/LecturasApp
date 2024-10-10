import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) { }
  

  getInfoLibro(termino: string) {
    this.router.navigate(['/buscador', termino]);
  }


}
