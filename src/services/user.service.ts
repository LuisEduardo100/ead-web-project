import { EpisodeInstance } from "src/models/Episode.js";
import { UserRepository } from "src/repositories/user.repository.js";
import { filterLastEpisodeFromEachCourse } from "src/utils/episodeUtils.js";
import bcrypt from "bcrypt";
import { UpdatePasswordDTO } from "src/dtos/user.dto.js";

export class UserService {
  private userRepository = new UserRepository();

  async getKeepWatchingList(userId: number): Promise<EpisodeInstance[]> {
    const user = await this.userRepository.getKeepWatchingEpisodes(userId);

    if (!user || !user.episodes) {
      throw new Error("Usuário ou episódios não encontrados");
    }

    const keepWatchingList = filterLastEpisodeFromEachCourse(user.episodes);

    // @ts-ignore
    keepWatchingList.sort((a, b) =>
      (a.watchTime?.updatedAt ?? 0) < (b.watchTime?.updatedAt ?? 0) ? 1 : -1
    );

    return keepWatchingList;
  }

  async getUserById(userId: number) {
    return await this.userRepository.findById(userId);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async updateUser(userId: number, data: any) {
    return await this.userRepository.updateUser(userId, data);
  }

  async updateUserPassword(userId: number, dto: UpdatePasswordDTO) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isSamePassword = await bcrypt.compare(
      dto.currentPassword,
      user.password
    );
    if (!isSamePassword) {
      return false;
    }

    return await this.userRepository.updateUser(userId, {
      password: dto.newPassword,
    });
  }
}
