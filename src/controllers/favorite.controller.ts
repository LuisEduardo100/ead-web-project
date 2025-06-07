// src/controllers/favorite.controller.ts

import { Response } from "express";
import { FavoriteService } from "../services/favorite.service.js";
import { RequestWithUser } from "../middlewares/auth.middleware.js";

export class FavoriteController {
  private favoriteService = new FavoriteService();

  async index(req: RequestWithUser, res: Response) {
    const userId = req.user!.id;

    try {
      const favorites = await this.favoriteService.findByUserId(userId);
      return res.json(favorites);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async save(req: RequestWithUser, res: Response) {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const favorite = await this.favoriteService.create({ userId, courseId });
      return res.status(201).json(favorite);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async delete(req: RequestWithUser, res: Response) {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      await this.favoriteService.delete({ userId, courseId });
      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }
}
