import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authpages/login/login.component';
import { RegistroComponent } from './authpages/registro/registro.component';
import { HomeComponent } from './contentpages/home/home.component';
import { PerfilComponent } from './contentpages/perfil/perfil.component';
import { LibrosComponent } from './contentpages/libros/libros.component';
import { BuscadorComponent } from './contentpages/buscador/buscador.component';
import { RouterModule } from '@angular/router';
import { InfoComponent } from './contentpages/info/info.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    LibrosComponent,
    BuscadorComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    LibrosComponent,
    BuscadorComponent,
    InfoComponent
  ]
})
export class PagesModule { }
