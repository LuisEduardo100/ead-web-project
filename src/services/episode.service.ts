import path, { dirname } from "path";
import fs from "fs";
import { Response } from "express";
import { EpisodeRepository } from "../repositories/episode.repository.js";
import { GetWatchTimeDTO, SetWatchTimeDTO } from "src/dtos/episode.dto.js";
import { fileURLToPath } from "url";
import { WatchTime } from "src/models/WatchTime.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export class EpisodeService {
  private episodeRepository = new EpisodeRepository();

  streamEpisodeToResponse(
    res: Response,
    videoUrl: string,
    range: string | undefined
  ) {
    const filePath = path.join(__dirname, "../../uploads", videoUrl);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Vídeo não encontrado" });
    }

    const fileStat = fs.statSync(filePath);

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileStat.size,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  }

  async getWatchTime({ userId, episodeId }: GetWatchTimeDTO) {
    const params: WatchTime = {
      userId,
      episodeId,
      seconds: 0,
    };
    return await this.episodeRepository.findWatchTime(params);
  }

  async setWatchTime({ userId, episodeId, seconds }: SetWatchTimeDTO) {
    const params: WatchTime = {
      userId,
      episodeId,
      seconds,
    };
    return await this.episodeRepository.saveWatchTime(params);
  }
}
