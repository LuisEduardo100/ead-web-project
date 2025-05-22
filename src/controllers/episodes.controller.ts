import { Request, Response } from "express";
import { RequestWithUser } from "src/middlewares/auth.middleware.js";
import { EpisodeService } from "src/services/episode.service.js";

export class EpisodesController {
  private episodeService = new EpisodeService();

  async stream(req: Request, res: Response) {
    const { videoUrl } = req.query;
    const range = req.headers.range;

    try {
      if (typeof videoUrl !== "string") {
        throw new Error("videoUrl deve ser uma string");
      }

      this.episodeService.streamEpisodeToResponse(res, videoUrl, range);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async getWatchTime(req: RequestWithUser, res: Response) {
    const episodeId = Number(req.params.id);
    const userId = req.user!.id;

    try {
      const watchTime = await episodeService.getWatchTime(userId, episodeId);
      return res.json(watchTime);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  async setWatchTime(req: RequestWithUser, res: Response) {
    const episodeId = Number(req.params.id);
    const userId = req.user!.id;
    const { seconds } = req.body;

    try {
      const watchTime = await episodeService.setWatchTime({
        userId,
        episodeId,
        seconds,
      });
      return res.json(watchTime);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  }
}
