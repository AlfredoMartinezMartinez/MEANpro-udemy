import { Routes, RouterModule } from '@angular/router';


import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard, VerificaTokenGuard } from './services/service.index';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '',
      component: PagesComponent,
      canActivate: [ LoginGuardGuard, VerificaTokenGuard ],
      loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent }
];

// @NgModule({
//     imports: [RouterModule.forChild(appRoutes)],
//     exports: [RouterModule]
// })
// export class FeatureRoutingModule {}

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true} );
