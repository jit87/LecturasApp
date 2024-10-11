import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

libroId: any= ""; 

constructor(
    private _librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
  }


  ngOninit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.libroId = params;
        this.getInfoLibro(this.libroId); 
      }
    )
  }




  getInfoLibro(id: string) {
    this._librosService.getInfoLibroById(id).subscribe(
      (resp) => {
        console.log(resp); 
      }
    )
  }



   regresar() {
    this.location.back(); 
  }


}
