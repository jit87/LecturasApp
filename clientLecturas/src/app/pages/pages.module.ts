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
import { EstadoLibroComponent } from "../alonecomponents/estado-libro/estado-libro.component";
import { SocialComponent } from './contentpages/social/social.component';
import { PublicoperfilComponent } from './contentpages/publicoperfil/publicoperfil.component';
import { ReviewComponent } from './contentpages/review/review.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    LibrosComponent,
    BuscadorComponent,
    InfoComponent,
    EditarLibroComponent,
    SocialComponent,
    PublicoperfilComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EstadoLibroComponent
],
  exports: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    LibrosComponent,
    BuscadorComponent,
    InfoComponent,
    EditarLibroComponent,
    SocialComponent,
    PublicoperfilComponent,
    ReviewComponent
  ]
})
export class PagesModule { }
