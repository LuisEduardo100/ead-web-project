import { Course } from "../models/Course.js";
import { Episode } from "../models/Episode.js";
import { User, UserCreationAttributes, UserInstance } from "../models/User.js";

export class UserRepository {
  async findByEmail(email: string): Promise<UserInstance | null> {
    return await User.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UserInstance | null> {
    return await User.findByPk(id);
  }

  async createUser(data: UserCreationAttributes): Promise<UserInstance> {
    return await User.create(data);
  }

  async updateUser(
    id: number,
    data: Partial<UserCreationAttributes>
  ): Promise<UserInstance | null> {
    const [affectedRows, updatedUsers] = await User.update(data, {
      where: { id },
      individualHooks: true,
      returning: true,
    });

    return updatedUsers[0];
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) return false;

    await user.destroy();
    return true;
  }

  async listAllUsers(): Promise<UserInstance[]> {
    return await User.findAll();
  }

  async getKeepWatchingEpisodes(userId: number) {
    return await User.findByPk(userId, {
      attributes: [],
      include: {
        model: Episode,
        association: "episodes",
        include: [{ model: Course, as: "course" }],
        through: { as: "watchTime" },
      },
    });
  }
}
