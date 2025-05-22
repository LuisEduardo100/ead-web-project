import express from "express";
import { AuthController } from "./controllers/auth.controller.js";
import {
  ensureAuth,
  ensureAuthViaQuery,
  RequestWithUser,
} from "./middlewares/auth.middleware.js";
import { UserController } from "./controllers/user.controller.js";
import { EpisodesController } from "./controllers/episodes.controller.js";

const episodesController = new EpisodesController();
const authController = new AuthController();
const userController = new UserController();
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
