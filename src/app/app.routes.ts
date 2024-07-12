import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { HomepageRouteComponent } from '../routes/homepage-route/homepage-route.component';
import { LoginRouteComponent } from '../routes/login-route/login-route.component';
import { RegisterRouteComponent } from '../routes/register-route/register-route.component';
import { LogoutRouteComponent } from '../routes/logout-route/logout-route.component';
import { ForgotPasswordRouteComponent } from '../routes/forgot-password-route/forgot-password-route.component';
import { GuiRouteComponent } from '../routes/gui-route/gui-route.component';
import { PageNotFoundRouteComponent } from '../routes/page-not-found-route/page-not-found-route.component';

export const routes: Routes = [
    { path: '', component: PageNotFoundRouteComponent },
    { path: 'home', component: HomepageRouteComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginRouteComponent },
    { path: 'register', component: RegisterRouteComponent },
    { path: 'logout', component: LogoutRouteComponent, canActivate: [authGuard] },
    { path: 'forgot-password', component: ForgotPasswordRouteComponent },
    { path: 'gui', component: GuiRouteComponent },
    { path: '**', component: PageNotFoundRouteComponent },
];