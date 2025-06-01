export interface SetWatchTimeDTO {
  userId: number;
  episodeId: number;
  seconds: number;
}

export interface GetWatchTimeDTO {
  userId: number;
  episodeId: number;
}
