import { IProduct } from "../interfaces";
import BackendService from "./BackendService";

export interface CreateProductData {
  descripcion: string;
  nombre: string;
  precio: number;
  categoriaId: number;
  cantidadInicial: number;
  costoUnitario: number | null;
  costoTotal: number | null;
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
  async getProducts() {
    return await super.getQuery<{ data: IProduct[] }>({
      hasToken: true,
      path: this.path,
    });
  }
}

export const productService = new ProductService();
