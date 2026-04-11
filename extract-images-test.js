const fs = require('fs');

const svgData = fs.readFileSync('ease mu puja updated.svg', 'utf8');
const imageRegex = /<image[^>]*href="data:image\/([^;]+);base64,([^"]+)"[^>]*>/g;

let match;
let count = 0;
while ((match = imageRegex.exec(svgData)) !== null) {
  count++;
  const ext = match[1];
  const base64Data = match[2];
  fs.writeFileSync(`public/extracted_${count}.${ext}`, base64Data, 'base64');
}

console.log(`Found and extracted ${count} images from the SVG.`);
