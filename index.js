const fs = require("fs").promises;
const path = require("path");
const { randomInt } = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const distributeFilesRandomly = async (directory, randomRange) => {
  try {
    const files = await fs.readdir(directory);
    const shuffledFiles = shuffleArray(files);

    for (const file of shuffledFiles) {
      const source = path.join(directory, file);
      let randomFileName = `${randomInt(randomRange)}_${file}`;
      while (await fs.access(path.join(directory, randomFileName)).catch(() => null)) {
        randomFileName = `${randomInt(randomRange)}_${file}`;
      }
      const destination = path.join(directory, randomFileName);

      await fs.rename(source, destination);
      console.log(`${file} dosyası ${randomFileName} olarak güncellendi.`);
    }
  } catch (err) {
    console.error("Hata:", err);
  }
};

const promptUser = async () => {
  try {
    const targetDirectory = await new Promise((resolve) => rl.question("Hedef dizini girin: ", resolve));
    const randomRange = parseInt(await new Promise((resolve) => rl.question("Random aralığını girin: ", resolve)));

    await distributeFilesRandomly(targetDirectory, randomRange);
  } catch (err) {
    console.error("Hata:", err);
  } finally {
    rl.close();
  }
};

promptUser();
