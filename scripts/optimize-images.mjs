import sharp from "sharp";
import fs from "fs";
import path from "path";

const sourceRoot = path.resolve("src/assets/capacitaciones");
const outputRoot = path.resolve("src/assets/capacitaciones-web");

const folders = [
  "BOMBERO_FORESTAL",
  "GESTION_DE_EMERGENCIAS",
];

async function optimizeFolder(folder) {
  const sourceFolder = path.join(sourceRoot, folder);
  const outputFolder = path.join(outputRoot, folder);

  fs.mkdirSync(outputFolder, { recursive: true });

  const files = fs
    .readdirSync(sourceFolder)
    .filter((file) => file.toLowerCase().endsWith(".png"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  let originalSize = 0;
  let optimizedSize = 0;

  for (const file of files) {
    const input = path.join(sourceFolder, file);
    const output = path.join(
      outputFolder,
      file.replace(/\.png$/i, ".webp")
    );

    const inputStats = fs.statSync(input);
    originalSize += inputStats.size;

    await sharp(input)
      .webp({
        quality: 90,
        effort: 6,
      })
      .toFile(output);

    const outputStats = fs.statSync(output);
    optimizedSize += outputStats.size;

    console.log(`✓ ${folder}/${file}`);
  }

  console.log(`\n${folder}`);
  console.log(`Original:  ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimizado: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `Reducción: ${((1 - optimizedSize / originalSize) * 100).toFixed(1)}%`
  );
  console.log("----------------------------------------");
}

async function main() {
  fs.mkdirSync(outputRoot, { recursive: true });

  for (const folder of folders) {
    await optimizeFolder(folder);
  }

  console.log("\n✓ Conversión terminada.");
}

main().catch((error) => {
  console.error("Error durante la conversión:", error);
  process.exit(1);
});