import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authpages/login/login.component';
import { RegistroComponent } from './authpages/registro/registro.component';
import { HomeComponent } from './contentpages/home/home.component';
import { PerfilComponent } from './contentpages/perfil/perfil.component';
import { LibrosComponent } from './contentpages/libros/libros.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    LibrosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    LibrosComponent
  ]
})
export class PagesModule { }
