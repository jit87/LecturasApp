import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/contentpages/home/home.component';
import { PerfilComponent } from './pages/contentpages/perfil/perfil.component';
import { LibrosComponent } from './pages/contentpages/libros/libros.component';
import { LoginComponent } from './pages/authpages/login/login.component';
import { RegistroComponent } from './pages/authpages/registro/registro.component';
import { BuscadorComponent } from './pages/contentpages/buscador/buscador.component';
import { InfoComponent } from './pages/contentpages/info/info.component';
import { AuthGuard } from './guards/auth.guard';
import { SocialComponent } from './pages/contentpages/social/social.component';
import { PublicoperfilComponent } from './pages/contentpages/publicoperfil/publicoperfil.component';
import { ReviewComponent } from './pages/contentpages/review/review.component';


export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent }, 
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'libros', component: LibrosComponent, canActivate: [AuthGuard] },
    { path: 'buscador/:termino', component: BuscadorComponent, canActivate: [AuthGuard] },
    { path: 'info/:id', component: InfoComponent, canActivate: [AuthGuard] }, 
    { path: 'social', component: SocialComponent, canActivate: [AuthGuard] }, 
    { path: 'perfilpublico/:id', component: PublicoperfilComponent, canActivate: [AuthGuard] },
    { path: 'review/:id/:idUsuario', component:ReviewComponent, canActivate: [AuthGuard] },
    { path: '**', pathMatch:'full', redirectTo:'home'}
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
