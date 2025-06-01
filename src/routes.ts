import express from "express";
import { AuthController } from "./controllers/auth.controller.js";
import {
  ensureAuth,
  ensureAuthViaQuery,
} from "./middlewares/auth.middleware.js";
import { UserController } from "./controllers/user.controller.js";
import { EpisodesController } from "./controllers/episodes.controller.js";
import { CategoriesController } from "./controllers/categories.controller.js";
import { CourseController } from "./controllers/course.controller.js";
import { LikeController } from "./controllers/like.controller.js";
import { FavoriteController } from "./controllers/favorite.controller.js";

const episodesController = new EpisodesController();
const authController = new AuthController();
const userController = new UserController();
const categoriesController = new CategoriesController();
const coursesController = new CourseController();
const likeController = new LikeController();
const favoriteControler = new FavoriteController();
const router = express.Router();

/*
ROTA DE AUTENTICAÇÃO
- POST /auth/register
- POST /auth/login
*/
router.post("/auth/register", (req, res) => {
  authController.register(req, res);
});
router.post("/auth/login", (req, res) => {
  authController.login(req, res);
});
/*
ROTA DE CATEGORIAS
- GET /categories
- GET /categories/:id
*/
//@ts-ignore
router.get("/categories", ensureAuth, (req, res) => {
  categoriesController.index(req, res);
});
//@ts-ignore
router.get("/categories/:id", ensureAuth, (req, res) => {
  categoriesController.show(req, res);
});
/*
ROTA DE CURSOS
- GET /courses
- GET /courses/:id
- GET /courses/featured
- GET /courses/popular
- GET /courses/search
*/
//@ts-ignore
router.get("/courses/featured", (req, res) => {
  coursesController.featured(req, res);
});
//@ts-ignore
router.get("/courses/newest", (req, res) => {
  coursesController.newest(req, res);
});
//@ts-ignore
router.get("/courses/popular", ensureAuth, (req, res) => {
  coursesController.popular(req, res);
});
//@ts-ignore
router.get("/courses/search", ensureAuth, (req, res) => {
  coursesController.search(req, res);
});
//@ts-ignore
router.get("/courses/:id", (req, res) => {
  coursesController.show(req, res);
});
/* 
ROTA DE LIKES
- POST /likes
- DELETE /likes
*/
//@ts-ignore
router.post("/likes", ensureAuth, (req, res) => {
  likeController.save(req, res);
});
//@ts-ignore
router.delete("/likes", ensureAuth, (req, res) => {
  likeController.delete(req, res);
});
/* 
ROTA DE FAVORITOS
- GET /favorites
- POST /favorites
- DELETE /favorites
*/
//@ts-ignore
router.get("/favorites", ensureAuth, (req, res) => {
  favoriteControler.index(req, res);
});
//@ts-ignore
router.post("/favorites", ensureAuth, (req, res) => {
  favoriteControler.save(req, res);
});
//@ts-ignore
router.delete("/favorites", ensureAuth, (req, res) => {
  favoriteControler.delete(req, res);
});
/* 
ROTAS DE USUÁRIOS
- GET /users/current
- GET /users/current/watching
- PUT /users/current
- PUT /users/current/password
*/
//@ts-ignore
router.get("/users/current", ensureAuth, (req, res) => {
  userController.show(req, res);
});
//@ts-ignore
router.get("/users/current/watching", ensureAuth, (req, res) => {
  userController.getKeepWatchingList(req, res);
});
//@ts-ignore
router.put("/users/current", ensureAuth, (req, res) => {
  userController.update(req, res);
});
//@ts-ignore
router.put("/users/current/password", ensureAuth, (req, res) => {
  userController.updatePassword(req, res);
});
/* 
ROTAS DE EPISÓDIOS
- GET /episodes/stream
- GET /episodes/:id/watchTime
- POST /episodes/:id/watchTime
*/
//@ts-ignore
router.get("/episodes/stream", ensureAuthViaQuery, (req, res) => {
  episodesController.stream(req, res);
});
//@ts-ignore
router.get("/episodes/:id/watchTime", ensureAuth, (req, res) => {
  episodesController.getWatchTime(req, res);
});
//@ts-ignore
router.post("/episodes/:id/watchTime", ensureAuth, (req, res) => {
  episodesController.setWatchTime(req, res);
});

export default router;
