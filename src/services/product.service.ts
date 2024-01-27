import BackendService from "./BackendService";

export interface CreateProductData {
  descripcion: string;
  nombre: string;
  precio: number;
  existencias: number;
  categoriaId: number;
  cantidadInicial: number;
  costoUnitario: null;
  costoTotal: null;
}

class ProductService extends BackendService {
  private readonly path = "Producto";
  async createProduct(body: CreateProductData) {
    return await super.postQuery({
      hasToken: true,
      path: this.path,
      body,
    });
  }
}

export const productService = new ProductService();
