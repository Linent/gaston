import BackendService from "./BackendService";

import {
  CostReport,
  CreateProductData,
  ICategory,
  IMovementType,
  IMovementsInform,
  IProduct,
  SalesReport,
} from "../interfaces";

interface GetTokenBody {
  usuario: string;
  password: string;
}

interface MovementData {
  cantidad: number;
  costoTotal: number | null;
  costoUnitario: number | null;
  productoId: number;
}
interface CreateMovementData {
  movimientos: MovementData[];
  tipoMovimientoId: number;
}

enum BackendRoute {
  CATEGORY = "Categoria",
  PRODUCT = "Producto",
  MOVEMENT = "Movimiento",
  TOKEN = "token",
  MOVEMENT_TYPE = "TipoMovimiento",
  SALES = "Venta",
  USER = "usuarios",
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

  async getProductById(id: string | number) {
    return await super.getQuery<{ data: IProduct }>({
      hasToken: true,
      path: `${BackendRoute.PRODUCT}/${id}`,
    });
  }

  async deleteProduct(id: string | number) {
    return await super.deleteQuery<{ data: IProduct }>({
      hasToken: true,
      path: `${BackendRoute.PRODUCT}/eliminarProducto/${id}`,
    });
  }

  /* MOVEMENTS */

  async createMovements({ movimientos, tipoMovimientoId }: CreateMovementData) {
    const body = { movimientos, tipoMovimientoId };
    return await super.postQuery<{ data: any }>({
      hasToken: true,
      path: `${BackendRoute.MOVEMENT}/registrarMovimientos`,
      body,
    });
  }

  async getMovementReport(fechaInicio?: string, fechaFin?: string) {
    return await super.getQuery<{ data: IMovementsInform[] }>({
      hasToken: true,
      path: `${BackendRoute.MOVEMENT}/reporteMovimientos`,
      params: { fechaInicio, fechaFin },
    });
  }

  async getSalesReport(fechaInicio?: string, fechaFin?: string) {
    return await super.getQuery<{ data: SalesReport }>({
      hasToken: true,
      path: `${BackendRoute.MOVEMENT}/reporteVentas`,
      params: { fechaInicio, fechaFin },
    });
  }

  async getSalesCostReport(productId: string | number) {
    return await super.getQuery<{ data: CostReport }>({
      hasToken: true,
      path: `${BackendRoute.MOVEMENT}/reporteVentasXcosto`,
      params: {productoId: productId}
    });
  }

  /* MOVEMENT_TYPES */

  async getMovementTypes() {
    return await super.getQuery<{ data: IMovementType[] }>({
      hasToken: true,
      path: BackendRoute.MOVEMENT_TYPE,
    });
  }

  /* SALES */

  async getSalesReportDate(fechaInicio?: string, fechaFin?: string) {
    return await super.getQuery<{ data: IMovementType[] }>({
      hasToken: true,
      path: BackendRoute.SALES,
      params: { fechaInicio, fechaFin },
    });
  }

  /* USUARIOS */

  async registerUser(body: any) {
    return await super.postQuery({
      path: BackendRoute.USER,
      body,
    });
  }
}

export const generalService = new GeneralService();
