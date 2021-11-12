export interface ProyectosResponse {
  id_proyecto: number;
  codigo_proyecto: string;
  nombre_proyecto: string;
  descripcion_proyecto: string;
  fecha_inicio_proyecto: string;
  fecha_final_proyecto: string;
  valor_anticipado: number;
  valor_total_proyecto: number;
  geoposicion?: any;
  id_estado: number;
  tipo_estado: string;
}
