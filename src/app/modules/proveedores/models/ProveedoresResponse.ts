export interface ProveedoresResponse {
  id_proveedor: number;
  id_tipo_identificacion: number;
  id_ciudad: number;
  id_ubicacion: number;
  id_pais: number;
  nombre: string;
  tipo_identificacion: string;
  identificacion: string;
  direccion: string;
  telefono: string;
  celular?: any;
  correo: string;
  nombre_ciudad: string;
  nombre_ubicacion: string;
  nombre_pais: string;
  abreviatura: string;
}
