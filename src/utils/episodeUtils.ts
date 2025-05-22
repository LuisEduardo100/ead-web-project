import { EpisodeInstance } from "src/models/Episode.js";

export function filterLastEpisodeFromEachCourse(
  episodes: EpisodeInstance[]
): EpisodeInstance[] {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (e) => e.courseId === episode.courseId
    );

    if (episodeFromSameCourse!.order > episode.order) {
      return currentList;
    }

    const listWithoutEpisodeFromSameCourse = currentList.filter(
      (e) => e.courseId !== episode.courseId
    );
    listWithoutEpisodeFromSameCourse.push(episode);

    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}
