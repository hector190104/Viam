// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { CursoListComponent } from './curso-list/curso-list.component';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle.component';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgresoComponent } from './progreso/progreso.component';
import { MedallasComponent } from './medallas/medallas.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { NivelDetalleComponent } from './nivel-detalle/nivel-detalle.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { FormularioComponent } from './formulario/formulario.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' }, // <-- Redirección al home
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: 'formulario', component: FormularioComponent  },
    { path: 'dashboard', component: DashboardComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'cursos', component: CursoListComponent },
      { path: 'cursos/:slug', component: CursoDetalleComponent },
      { path: 'subir-curso', component: CursoFormComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'progreso', component: ProgresoComponent },
      { path: 'medallas', component: MedallasComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'cursos/:cursoId/tema/:temaIndex/nivel/:nivelIndex', component: NivelDetalleComponent },
      { path: '**', component: NoEncontradoComponent }
    ]
  }
];
