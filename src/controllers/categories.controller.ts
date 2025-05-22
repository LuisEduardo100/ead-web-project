import { Request, Response } from "express";
import { CategoryService } from "src/services/category.service.js";
import { getPaginationParams } from "src/utils/paginationUtils.js";

export class CategoriesController {
  private categoryService = new CategoryService();

  async index(req: Request, res: Response) {
    const [page, perPage] = getPaginationParams(req.query);

    try {
      const paginatedCategories = await this.categoryService.findAllPaginated(
        page,
        perPage
      );
      return res.json(paginatedCategories);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await this.categoryService.findByIdWithCourses(id);
      return res.json(category);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  }
}
