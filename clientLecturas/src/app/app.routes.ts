
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/contentpages/home/home.component';
import { PerfilComponent } from './pages/contentpages/perfil/perfil.component';
import { LibrosComponent } from './pages/contentpages/libros/libros.component';
import { LoginComponent } from './pages/authpages/login/login.component';
import { RegistroComponent } from './pages/authpages/registro/registro.component';
import { BuscadorComponent } from './pages/contentpages/buscador/buscador.component';
import { InfoComponent } from './pages/contentpages/info/info.component';


export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent }, 
    { path: 'home', component: HomeComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'libros', component: LibrosComponent },
    { path: 'buscador/:termino', component: BuscadorComponent },
    { path: 'info/:id', component:InfoComponent }, 
    { path: '**', pathMatch:'full', redirectTo:'home'}
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
