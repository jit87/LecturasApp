import { Component } from '@angular/core';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent {

  posts: any[] = [];
  seguidos: any[] = []; 

  constructor(private _lecturasBBDDService: LecturasBBDDService,
              private _authService: AuthService
  ) {}

  ngOnInit() {
    this.getActividad(); 
  }


  seguir(id: any) {
    
  }

 getActividad() {
    this._lecturasBBDDService.getListLibrosUsuarios().subscribe(
      (resp) => {
        console.log(resp); 
        this.posts = resp; 
        var nombre = this.getNombrePorId(resp._idUsuario); 
        console.log("Nombre de usuario:", nombre); 
      }
    )
  }

  getNombrePorId(id: any) {
    this._authService.getUserById(id).subscribe(
      (resp) => {
        console.log(resp); 
      },
      (err) => {
        console.log(err); 
      }
    )
  }

}
