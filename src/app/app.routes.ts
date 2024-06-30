import { Routes } from '@angular/router';
import { HomepageComponent } from './routes/homepage/homepage.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { Launcher2000Component } from './routes/launcher-2000/launcher-2000.component';
import { PageNotFoundComponent } from './routes/page-not-found//page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'launcher-2000', component: Launcher2000Component },
    { path: '**', component: PageNotFoundComponent },
];