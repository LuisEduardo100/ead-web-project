import AdminJS, { ComponentLoader } from "adminjs";
import AdminJsExpress from "@adminjs/express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import session from "express-session";
import connectionSession from "connect-session-sequelize";
import AdminJsSequelize from "@adminjs/sequelize";
import { adminJsResources } from "./resources/index.js";
import { database } from "../database/index.js";
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment.js";
import { componentLoader } from "./componentLoader.js";
// const componentLoader = new ComponentLoader();
const SequelizeStore = connectionSession(session.Store);
const store = new SequelizeStore({ db: database });
store.sync();

AdminJS.registerAdapter(AdminJsSequelize);

export const adminJs = new AdminJS({
  databases: [database],
  rootPath: "/admin",
  componentLoader,
  resources: adminJsResources,
  branding: {
    companyName: "VoceNotaDez",
  },
});

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if (user && user.role === "admin") {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          return user;
        }
      }
      return false;
    },
    cookiePassword: ADMINJS_COOKIE_PASSWORD,
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD,
  }
);

adminJs.watch();
