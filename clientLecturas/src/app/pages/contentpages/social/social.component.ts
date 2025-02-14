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
  usuarios: any[] = []; 

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
         for (var i = 0; i <= resp.length; i++){
           this.getDatosPorId(resp[i]._idUsuario); 
         }
      }
    )
  }

  getDatosPorId(id: any) {
    this._authService.getUserById(id).subscribe(
      (resp) => {
        this.usuarios.push(resp); 
      },
      (err) => {
        console.log(err); 
      }
    )
  }

}
