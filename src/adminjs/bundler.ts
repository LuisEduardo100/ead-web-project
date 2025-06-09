// src/adminjs/bundler.ts
import { bundle } from "@adminjs/bundler";
import { componentLoader } from "./componentLoader.js";

async function bundleComponents() {
  console.log("Iniciando o bundle dos componentes do AdminJS...");
  try {
    await bundle({
      componentLoader: componentLoader,
      destinationDir: "./public/admin",
    });
    console.log("Bundle dos componentes finalizado com sucesso!");
  } catch (error) {
    console.error("Ocorreu um erro durante o bundle do AdminJS:", error);
    process.exit(1);
  }
}

bundleComponents();
