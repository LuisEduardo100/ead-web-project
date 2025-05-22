import { Category, CategoryInstance } from "src/models/Category.js";

export class CategoryRepository {
  async findAllPaginated(
    page: number,
    perPage: number
  ): Promise<{ rows: CategoryInstance[]; count: number }> {
    const offset = (page - 1) * perPage;

    return await Category.findAndCountAll({
      attributes: ["id", "name", "position"],
      order: [["position", "ASC"]],
      limit: perPage,
      offset,
    });
  }

  async findByIdWithCourses(id: string): Promise<CategoryInstance | null> {
    return await Category.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "courses",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });
  }
}
