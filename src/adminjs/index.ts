import AdminJS from "adminjs";
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
import sequelize from "sequelize";

const SequelizeStore = connectionSession(session.Store);
const store = new SequelizeStore({ db: database });
store.sync();

const isProduction = process.env.NODE_ENV === "production";
// AdminJS.registerAdapter(AdminJsSequelize);
AdminJS.registerAdapter({
  Database: AdminJsSequelize.Database,
  Resource: AdminJsSequelize.Resource,
});

export const adminJs = new AdminJS({
  databases: [database],
  rootPath: "/admin",
  componentLoader: componentLoader,
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

if (!isProduction) {
  adminJs.watch();
} else {
  adminJs.initialize();
}
