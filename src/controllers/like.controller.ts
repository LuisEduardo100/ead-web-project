import { Response } from "express";
import { LikeService } from "../services/like.service.js";
import { RequestWithUser } from "src/middlewares/auth.middleware.js";

export class LikeController {
  private likeService = new LikeService();

  async save(req: RequestWithUser, res: Response) {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const like = await this.likeService.create({ userId, courseId });
      return res.status(201).json(like);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async delete(req: RequestWithUser, res: Response) {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      await this.likeService.delete({ userId, courseId });
      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }
}
