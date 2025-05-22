import { FavoriteRepository } from "../repositories/favorite.repository.js";

export class FavoriteService {
  private favoriteRepository = new FavoriteRepository();

  async isFavorited(courseId: number, userId: number) {
    return await this.favoriteRepository.isFavorited(courseId, userId);
  }

  async findByUserId(userId: number) {
    return await this.favoriteRepository.findByUserId(userId);
  }

  async create(userId: number, courseId: number) {
    const existing = await this.favoriteRepository.findOne(userId, courseId);

    if (existing) {
      throw new Error("Curso já existente na lista");
    }

    return await this.favoriteRepository.create({ userId, courseId });
  }

  async delete(userId: number, courseId: number) {
    return await this.favoriteRepository.delete(userId, courseId);
  }
}
