import { ICategory } from "../interfaces";
import BackendService from "./BackendService";


class CategoryService extends BackendService {
  private readonly path = "Categoria";

  async getCategories() {
    return await super.getQuery<{ data: ICategory[] }>({
      hasToken: true,
      path: this.path,
    });
  }
}

export const categoryService = new CategoryService();
