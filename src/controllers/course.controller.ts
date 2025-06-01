// src/controllers/course.controller.ts

import { Request, Response } from "express";
import { CourseService } from "../services/course.service.js";
import { getPaginationParams } from "../utils/paginationUtils.js";
import { RequestWithUser } from "src/middlewares/auth.middleware.js";
import { LikeService } from "src/services/like.service.js";
import { FavoriteService } from "src/services/favorite.service.js";

export class CourseController {
  private courseService = new CourseService();
  private likeService = new LikeService();
  private favoriteService = new FavoriteService();

  async show(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id;

    try {
      const course = await this.courseService.findByIdWithEpisodes(id);
      if (!course) {
        return res.status(404).json({ message: "Curso não encontrado" });
      }

      const params = {
        courseId: course.id,
        userId,
      };
      const liked = await this.likeService.isLiked(params);
      const favorited = await this.favoriteService.isFavorited(params);

      return res.json({ ...course.get(), liked, favorited });
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async showNoAuth(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const course = await this.courseService.findByIdWithEpisodes(id);
      if (!course) {
        return res.status(404).json({ message: "Curso não encontrado" });
      }

      return res.json({ ...course.get() });
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async featured(req: Request, res: Response) {
    try {
      const featured = await this.courseService.getRandomFeaturedCourses();
      return res.json(featured);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async search(req: Request, res: Response) {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      if (typeof name !== "string")
        throw new Error("name param must be of type string");
      const results = await this.courseService.findByName(name, page, perPage);
      return res.json(results);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async popular(req: Request, res: Response) {
    try {
      const topTen = await this.courseService.getTopTenByLikes();
      return res.json(topTen);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async newest(req: Request, res: Response) {
    try {
      const newest = await this.courseService.getTopTenNewest();
      return res.json(newest);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }
}
