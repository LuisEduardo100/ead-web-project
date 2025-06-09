import { ResourceOptions, FeatureType } from "adminjs";
import uploadFileFeature from "@adminjs/upload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { componentLoader } from "../componentLoader.js";
import { CustomLocalProvider } from "../../utils/customLocalProvider.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../../../public");

export const courseResourceOptions: ResourceOptions = {
  navigation: {
    name: "Catálogo",
    icon: "Categories",
  },
  editProperties: [
    "name",
    "synopsis",
    "uploadThumbnail",
    "featured",
    "categoryId",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "featured",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "featured", "categoryId"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "featured",
    "thumbnailUrl",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
};

export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    componentLoader,
    provider: new CustomLocalProvider({
      bucket: publicDir,
      opts: { baseUrl: "public" },
    }),
    properties: {
      key: "thumbnailUrl",
      file: "uploadThumbnail",
      filePath: "thumbnailFilePath",
      filesToDelete: "thumbnailToDelete",
    },
    uploadPath: (record, filename) =>
      `thumbnails/course-${record.get("id")}/${filename}`,
  }),
];
