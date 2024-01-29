export interface IProduct {
  id: number;
  descripcion: string;
  nombre: string;
  precio: number;
  existencias: number;
  categoriaId: number;
  cantidadInicial: number;
  costoUnitario: number | null;
  costoTotal: number | null;
}

export interface CreateProductData {
  descripcion: string;
  nombre: string;
  precio: number;
  categoriaId: number;
  cantidadInicial: number;
  costoUnitario: number | null;
  costoTotal: number | null;
}

export interface EditProductData {
  descripcion: string;
  nombre: string;
  precio: number;
  categoriaId: number;
}