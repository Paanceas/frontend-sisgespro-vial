import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InformacionComponent } from './components/informacion/informacion.component';


const routes: Routes = [
    {path:'', component: InformacionComponent},
    {path:'sisgespro', component: InformacionComponent },
    {path:'**', component:InformacionComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule {}
