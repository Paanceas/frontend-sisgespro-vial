import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';
import { NoSessionGuard } from 'src/app/guards/no-session.guard';

const routes: Routes = [
    {path:'', component: InicioComponent, canActivate:[NoSessionGuard]},
    {path:'inicio', component: InicioComponent, canActivate:[NoSessionGuard] },
    {path:'**', component:InicioComponent, canActivate:[NoSessionGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule {}
