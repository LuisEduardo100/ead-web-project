import { LikeDTO } from "src/dtos/like.dto.js";
import { LikeRepository } from "../repositories/like.repository.js";

export class LikeService {
  private likeRepository = new LikeRepository();

  async create({ userId, courseId }: LikeDTO) {
    const existing = await this.likeRepository.findOne({ userId, courseId });

    if (existing) {
      throw new Error("Este usuário já gostou deste curso");
    }

    return await this.likeRepository.create({ userId, courseId });
  }

  async delete({ userId, courseId }: LikeDTO) {
    return await this.likeRepository.delete({ userId, courseId });
  }

  async isLiked({ userId, courseId }: LikeDTO) {
    return await this.likeRepository.isLiked({ courseId, userId });
  }
}
