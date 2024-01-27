import BackendService from "./BackendService";

import { CreateProductData, ICategory, IMovementType, IProduct } from "../interfaces";

interface GetTokenBody {
  usuario: string;
  password: string;
}

enum BackendRoute {
  CATEGORY = "Categoria",
  PRODUCT = "Producto",
  MOVEMENT = "Movimiento",
  TOKEN = "token",
  MOVEMENT_TYPE = "TipoMovimiento"
}

class GeneralService extends BackendService {
  /* TOKEN */

  async login(body: GetTokenBody) {
    return await super.postQuery({
      path: BackendRoute.TOKEN,
      body,
    });
  }

  /* CATEGORIES */

  async getCategories() {
    return await super.getQuery<{ data: ICategory[] }>({
      hasToken: true,
      path: BackendRoute.CATEGORY,
    });
  }

  /* PRODUCTS */

  async createProduct(body: CreateProductData) {
    return await super.postQuery({
      hasToken: true,
      path: BackendRoute.PRODUCT,
      body,
    });
  }

  async getProducts() {
    return await super.getQuery<{ data: IProduct[] }>({
      hasToken: true,
      path: BackendRoute.PRODUCT,
    });
  }

  async getProductById(id: string) {
    return await super.getQuery<{ data: IProduct }>({
      hasToken: true,
      path: `${BackendRoute.PRODUCT}/${id}`,
    });
  }

  /* MOVEMENTS */

  async getMovements() {
    return await super.getQuery<{ data: any }>({
      hasToken: true,
      path: BackendRoute.MOVEMENT,
    });
  }

  /* MOVEMENT_TYPES */

  async getMovementTypes() {
    return await super.getQuery<{ data: IMovementType[] }>({
      hasToken: true,
      path: BackendRoute.MOVEMENT_TYPE,
    });
  }

}

export const generalService = new GeneralService();
