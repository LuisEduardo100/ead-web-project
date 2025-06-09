import { ResourceOptions, FeatureType } from "adminjs";
import uploadFileFeature from "@adminjs/upload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { componentLoader } from "../componentLoader.js";
import { CustomLocalProvider } from "../../utils/customLocalProvider.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../../../uploads");

export const episodeResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: [
    "name",
    "synopsis",
    "courseId",
    "order",
    "uploadVideo",
    "secondsLong",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "courseId",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "courseId", "order", "secondsLong"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "courseId",
    "order",
    "videoUrl",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
};

export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    componentLoader,
    provider: new CustomLocalProvider({
      bucket: publicDir,
      opts: { baseUrl: "uploads" },
    }),
    properties: {
      key: "videoUrl",
      file: "uploadVideo",
    },
    validation: {
      maxSize: 1073741824, // 1gb
    },
    uploadPath: (record, filename) => {
      return `videos/course-${record.get("courseId")}/${filename}`;
    },
    //@ts-ignore
    copyFile: true,
  }),
];
