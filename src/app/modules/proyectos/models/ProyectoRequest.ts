export interface Proyecto {
  id_cotizacion: number;
  id_estado: number;
  nombre_proyecto: string;
  codigo_proyecto: string;
  descripcion_proyecto: string;
  fecha_inicio_proyecto: string;
  valor_anticipado: number;
  valor_total_proyecto: number;
  geoposicion: string;
  empleados_proyecto: Empleado[];
}

export interface Empleado {
  id_empleado: number;
}

