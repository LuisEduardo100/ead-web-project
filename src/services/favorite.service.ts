import { FavoriteDTO } from "src/dtos/favorite.dto.js";
import { FavoriteRepository } from "../repositories/favorite.repository.js";

export class FavoriteService {
  private favoriteRepository = new FavoriteRepository();

  async isFavorited({ courseId, userId }: FavoriteDTO) {
    return await this.favoriteRepository.isFavorited(courseId, userId);
  }

  async findByUserId({ userId }: FavoriteDTO) {
    return await this.favoriteRepository.findByUserId(userId);
  }

  async create({ courseId, userId }: FavoriteDTO) {
    const existing = await this.favoriteRepository.findOne(userId, courseId);

    if (existing) {
      throw new Error("Curso já existente na lista");
    }

    return await this.favoriteRepository.create({ userId, courseId });
  }

  async delete({ courseId, userId }: FavoriteDTO) {
    return await this.favoriteRepository.delete(userId, courseId);
  }
}
