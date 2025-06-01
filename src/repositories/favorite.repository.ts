import { Favorite } from "../models/Favorite.js";
import { FavoriteDTO } from "../dtos/favorite.dto.js";

export class FavoriteRepository {
  async findOne({ userId, courseId }: Favorite) {
    return await Favorite.findOne({ where: { userId, courseId } });
  }

  async create(data: Favorite) {
    return await Favorite.create(data);
  }

  async delete({ userId, courseId }: Favorite) {
    return await Favorite.destroy({ where: { userId, courseId } });
  }

  async isFavorited({ userId, courseId }: Favorite) {
    const favorite = await Favorite.findOne({ where: { courseId, userId } });
    return !!favorite;
  }

  async findByUserId(userId: number) {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: { userId },
      include: {
        association: "course",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
          "featured",
          ["category_id", "categoryId"],
        ],
      },
    });

    const courses = favorites.map((favorite: any) => favorite.course);

    return {
      userId,
      courses,
    };
  }
}
