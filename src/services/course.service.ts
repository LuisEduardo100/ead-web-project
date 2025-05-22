import { CourseRepository } from "../repositories/course.repository.js";

export class CourseService {
  private courseRepository = new CourseRepository();

  async findByIdWithEpisodes(id: string) {
    return await this.courseRepository.findByIdWithEpisodes(id);
  }

  async getRandomFeaturedCourses() {
    const featured = await this.courseRepository.findAllFeatured();
    return featured.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  async getTopTenByLikes() {
    return await this.courseRepository.findTopTenByLikes();
  }

  async getTopTenNewest() {
    return await this.courseRepository.findTopTenNewest();
  }

  async findByName(name: string, page: number, perPage: number) {
    const offset = (page - 1) * perPage;
    return await this.courseRepository.findByName(name, offset, perPage);
  }
}
