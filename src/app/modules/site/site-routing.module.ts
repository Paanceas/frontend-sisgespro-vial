import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
    {path:'', component: InicioComponent},
    {path:'inicio', component: InicioComponent },
    {path:'**', component:InicioComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule {}
