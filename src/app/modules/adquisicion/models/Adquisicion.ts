export interface Adquisicion {
  fecha_adquisicion: string;
  valor_total_adquisicion: number;
  materiales_adquisicion: MaterialesAdquisicion[];
}

export interface MaterialesAdquisicion {
  id_proveedor: number | null;
  id_categoria: number | null;
  id_tipo_uni_medida: number | null;
  codigo_material: string | null;
  nombre_material: string | null;
  precio_unitario: number | null;
  cantidad_total: number | null;
  descripcion_material: string | null;
}
