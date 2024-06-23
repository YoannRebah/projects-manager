import { Routes } from '@angular/router';
import { HomepageComponent } from './components/routes/homepage/homepage.component';
import { LoginComponent } from './components/routes/login/login.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
];