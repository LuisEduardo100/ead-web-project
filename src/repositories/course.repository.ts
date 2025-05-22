import { Op, Sequelize } from "sequelize";
import { Course } from "../models/Course.js";

export class CourseRepository {
  async findByIdWithEpisodes(id: string) {
    return await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        association: "episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
        separate: true,
        order: [["order", "ASC"]],
      },
    });
  }

  async findAllFeatured() {
    return await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: { featured: true },
    });
  }

  async findTopTenByLikes() {
    const [results] = await Course.sequelize!.query(
      `SELECT
        courses.id,
        courses.name,
        courses.synopsis,
        courses.thumbnail_url as "thumbnailUrl",
        COUNT(users.id) AS likes
      FROM courses
        LEFT JOIN likes ON courses.id = likes.course_id
        INNER JOIN users ON users.id = likes.user_id
      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10;`
    );
    return results;
  }

  async findTopTenNewest() {
    return await Course.findAll({
      limit: 10,
      order: [["created_at", "DESC"]],
    });
  }

  async findByName(name: string, offset: number, limit: number) {
    return await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: { name: { [Op.iLike]: `%${name}%` } },
      limit,
      offset,
    });
  }
}
