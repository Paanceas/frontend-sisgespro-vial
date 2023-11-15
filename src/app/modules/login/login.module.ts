import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [InicioSesionComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule],
})
export class LoginModule {}
