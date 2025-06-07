import dotenv from "dotenv";
dotenv.config();

import "./models/index.js";
import express from "express";
import cors from "cors";
import formidable from "express-formidable";
import { database } from "./database/index.js";
import { adminJs, adminJsRouter } from "./adminjs/index.js";
import router from "./routes.js";

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use((req, res, next) => {
  if (
    req.path.includes("/admin/api/resources/episodes/actions/new") &&
    req.method === "POST"
  ) {
    formidable({
      maxFileSize: 1024 * 1024 * 1024,
    })(req, res, next);
  } else {
    next();
  }
});
app.use(express.json());
app.use(router);
app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.PORT || 3000 || 4040 || 8080;

app.listen(PORT, async () => {
  await database.authenticate().then(() => {
    console.log("DB connection successfull.");
  });

  console.log(`Server started successfuly at port ${PORT}.`);
});
