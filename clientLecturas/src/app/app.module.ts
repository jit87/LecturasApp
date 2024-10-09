import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesModule } from './pages/pages.module';

//Rutas
import { APP_ROUTING } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';


//Componentes
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ 
    AppComponent
  ],
  imports: [
    APP_ROUTING,
    RouterModule,
    BrowserModule,
    ComponentsModule,
    PagesModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
