import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "mi-perfil",
        canActivate: [authGuard],
        loadComponent: () => import("./private/miperfil/miperfil.component").then(p => p.MiperfilComponent)
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
