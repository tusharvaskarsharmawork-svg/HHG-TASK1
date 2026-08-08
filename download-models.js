/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const https = require('https');
const path = require('path');

const modelsDir = path.join(__dirname, 'public', 'models');

if (!fs.existsSync(modelsDir)){
    fs.mkdirSync(modelsDir, { recursive: true });
}

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
const files = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1'
];

files.forEach(file => {
  const dest = path.join(modelsDir, file);
  const fileStream = fs.createWriteStream(dest);
  https.get(baseUrl + file, function(response) {
    response.pipe(fileStream);
    fileStream.on('finish', function() {
      fileStream.close();
      console.log('Downloaded', file);
    });
  }).on('error', function(err) {
    fs.unlink(dest, () => {});
    console.error('Error downloading', file, err.message);
  });
});
