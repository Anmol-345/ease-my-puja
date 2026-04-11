const sharp = require('sharp');
const fs = require('fs');

sharp('ease mu puja updated.svg')
  .png()
  .toFile('ease_mu_puja_updated.png')
  .then(info => {
    console.log('Conversion successful:', info);
  })
  .catch(err => {
    console.error('Conversion failed:', err);
  });
