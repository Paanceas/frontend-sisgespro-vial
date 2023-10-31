import { Pipe, PipeTransform } from '@angular/core';
import { EmpleadoResponse } from 'src/app/modules/empleados/models/empleadosResponse';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(empleados: EmpleadoResponse[], searchTerm: string): EmpleadoResponse[] {
    if (!empleados || !searchTerm) {
      return empleados;
    }

    return empleados.filter(empleado =>
      empleado.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }

}
