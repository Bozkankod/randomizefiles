const fs = require("fs");
const path = require("path");
const { randomInt } = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function distributeFilesRandomly(directory, randomRange) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Hata:", err);
      return;
    }

    const fileCount = files.length;
    const shuffledFiles = shuffleArray(files);

    shuffledFiles.forEach((file, index) => {
      const source = path.join(directory, file);
      let randomFileName = `${randomInt(randomRange)}_${file}`;
      while (fs.existsSync(path.join(directory, randomFileName))) {
        randomFileName = `${randomInt(randomRange)}_${file}`;
      }
      const destination = path.join(directory, randomFileName);

      fs.rename(source, destination, (err) => {
        if (err) {
          console.error(`Hata: ${file} dosyası taşınamadı.`, err);
          return;
        }
        console.log(`${file} dosyası ${randomFileName} olarak güncellendi.`);
      });
    });
  });
}

rl.question("Hedef dizini girin: ", (targetDirectory) => {
  rl.question("Random aralığını girin: ", (randomRange) => {
    distributeFilesRandomly(targetDirectory, parseInt(randomRange));
    rl.close();
  });
});
