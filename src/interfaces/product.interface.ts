export interface IProduct {
  id: number;
  descripcion: string;
  nombre: string;
  precio: number;
  existencias: number;
  categoriaId: number;
  cantidadInicial: number;
  costoUnitario: null;
  costoTotal: null;
}