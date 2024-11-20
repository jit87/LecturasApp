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
import { EditarLibroComponent } from './contentpages/editar-libro/editar-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    LibrosComponent,
    BuscadorComponent,
    InfoComponent,
    EditarLibroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    LibrosComponent,
    BuscadorComponent,
    InfoComponent,
    EditarLibroComponent
  ]
})
export class PagesModule { }
