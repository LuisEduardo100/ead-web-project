import { WatchTime } from "src/models/WatchTime.js";

export class EpisodeRepository {
  async findWatchTime({ userId, episodeId }: WatchTime) {
    return await WatchTime.findOne({
      attributes: ["seconds"],
      where: { userId, episodeId },
    });
  }

  async saveWatchTime({ userId, episodeId, seconds }: WatchTime) {
    const watchTime = await WatchTime.findOne({ where: { userId, episodeId } });

    if (watchTime) {
      watchTime.seconds = seconds;
      await watchTime.save();
      return watchTime;
    }

    return await WatchTime.create({ userId, episodeId, seconds });
  }
}
