import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';

//Rutas
import { APP_ROUTING } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';

//Otros
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LibrosData } from './abstracts/libros-data';
import { LibrosService } from './services/libros.service';


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
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LibrosData,
      useClass: LibrosService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
