import fs from "fs";
import path from "path";
import {
  LocalProvider,
  LocalUploadOptions,
  ProviderOpts,
} from "@adminjs/upload";
import { UploadedFile } from "adminjs";

interface CustomLocalUploadOptions {
  bucket: string;
  opts: { baseUrl?: string };
}

class CustomLocalProvider extends LocalProvider {
  private customBucket: string;
  private customBaseUrl: string;

  constructor(options: CustomLocalUploadOptions) {
    super(options);
    this.customBucket = options.bucket;
    this.customBaseUrl = options.opts?.baseUrl || "";
  }

  public async upload(file: UploadedFile, bucketPath: string): Promise<string> {
    const filePath = path.join(this.customBucket, bucketPath);
    const tmpPath = file.path;

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(tmpPath);
      const writeStream = fs.createWriteStream(filePath);

      readStream.on("error", (err) => {
        reject(err);
      });
      writeStream.on("error", (err) => {
        reject(err);
      });
      writeStream.on("finish", async () => {
        try {
          await fs.promises.unlink(tmpPath);
          const relativePath = path.join(this.customBaseUrl, bucketPath);
          resolve(relativePath.replace(/\\/g, "/"));
        } catch (unlinkErr) {
          console.error("Erro ao remover arquivo temporário:", unlinkErr);
          const relativePath = path.join(this.customBaseUrl, bucketPath);
          resolve(relativePath.replace(/\\/g, "/"));
        }
      });

      readStream.pipe(writeStream);
    });
  }
}

export { CustomLocalProvider };
