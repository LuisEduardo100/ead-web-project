import { Like } from "../models/Like.js";
import { LikeDTO } from "../dtos/like.dto.js";

export class LikeRepository {
  async findOne(userId: number, courseId: number) {
    return await Like.findOne({ where: { userId, courseId } });
  }

  async create(data: LikeDTO) {
    return await Like.create(data);
  }

  async delete(userId: number, courseId: number) {
    return await Like.destroy({ where: { userId, courseId } });
  }

  async isLiked(courseId: number, userId: number) {
    const like = await Like.findOne({ where: { courseId, userId } });
    return !!like;
  }
}
