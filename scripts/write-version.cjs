const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const fallbackVersion = 'v1.0.0';
const filePath = path.join(__dirname, '../public/version.txt');

try {
  const tag = execSync('git describe --tags').toString().trim();
  fs.writeFileSync(filePath, tag || fallbackVersion);
  console.log(`✔ Versión escrita: ${tag || fallbackVersion}`);
} catch (err) {
  console.warn(`⚠ No se pudo obtener el tag. Usando fallback: ${fallbackVersion}`);
  fs.writeFileSync(filePath, fallbackVersion);
}
