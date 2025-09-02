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
import { AbstractLibrosService } from './abstracts/AbstractLibrosService';
import { LibrosService } from './services/libros.service';
import { AbstractLecturasBBDDService } from './abstracts/AbstractLecturasBBDDService';
import { LecturasBBDDService } from './services/lecturas-bbdd.service';
import { EstadoLibroService } from './services/estado-libro.service';
import { AbstractEstadoLibroService } from './abstracts/AbstractEstadoLibroService';
import { AbstractChatService } from './abstracts/AbstractChatService';
import { ChatService } from './services/chat.service';
import { AbstractAuthService } from './abstracts/AbstractAuthService';
import { AuthService } from './services/auth.service';



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
      provide: AbstractLibrosService,
      useClass: LibrosService
    },
    {
      provide: AbstractLecturasBBDDService,
      useClass: LecturasBBDDService
    },
    {
      provide: AbstractEstadoLibroService,
      useClass: EstadoLibroService
    },
    {
      provide: AbstractChatService,
      useClass: ChatService
    },
    {
      provide: AbstractAuthService,
      useClass: AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
