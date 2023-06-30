const fs = require('fs');
const path = require('path');
const { randomInt } = require('crypto');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function distributeFilesRandomly(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Hata:', err);
      return;
    }

    const fileCount = files.length;
    const shuffledFiles = shuffleArray(files);

    shuffledFiles.forEach((file, index) => {
      const source = path.join(directory, file);
      const randomFileName = `${randomInt(fileCount)}.mp4`;
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

const targetDirectory = 'D:/repos/twitchgetclipbytopthree/videolar/kvideo/30-06-2023';
distributeFilesRandomly(targetDirectory);
