import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InformacionComponent } from './components/informacion/informacion.component';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';


const routes: Routes = [
    {path:'', component: InformacionComponent, canActivate:[AccesoTokenGuard]},
    {path:'sisgespro', component: InformacionComponent, canActivate:[AccesoTokenGuard]},
    {path:'**', component:InformacionComponent, canActivate:[AccesoTokenGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule {}
