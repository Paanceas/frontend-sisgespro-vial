import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./modules/site/site.module').then(m => m.SiteModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sisgespro',
    loadChildren: () => import('./modules/principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./modules/proveedores/proveedores.module').then(m => m.ProveedoresModule)
  },
  { path: '', redirectTo:'/inicio', pathMatch:'full'},
  { path: '**', redirectTo:'/inicio', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
