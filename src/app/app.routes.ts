import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "mi-perfil",
        loadComponent: () => import("./private/miperfil/miperfil.component").then(p => p.MiperfilComponent)
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
