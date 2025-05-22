// src/services/categoryService.ts

import { CategoryDTO, PaginatedCategoriesDTO } from "src/dtos/category.dto.js";
import { CategoryRepository } from "src/repositories/category.repository.js";

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async findAllPaginated(
    page: number,
    perPage: number
  ): Promise<PaginatedCategoriesDTO> {
    const { rows, count } = await this.categoryRepository.findAllPaginated(
      page,
      perPage
    );

    const categories: CategoryDTO[] = rows.map((category) => ({
      id: category.id,
      name: category.name,
      position: category.position,
    }));

    return {
      categories,
      page,
      perPage,
      total: count,
    };
  }

  async findByIdWithCourses(id: string) {
    const category = await this.categoryRepository.findByIdWithCourses(id);
    return category;
  }
}
