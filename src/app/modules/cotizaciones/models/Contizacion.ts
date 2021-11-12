export interface MaterialesCotizacion {
  id_material: number | null;
  id_tipo_uni_medida: number | null;
  precio: number;
  cantidad: number;
  descripcion: string | null;
}

export interface Cotizacion {
  id_cliente: number | null;
  fecha_cotizacion: string | null;
  nota_inicio: string | null;
  iva: number;
  nota_final: string | null;
  materiales_cotizacion: MaterialesCotizacion[];
}
