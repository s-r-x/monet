const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// dirs
const SRC_DIR = path.join(__dirname, 'paintings');
const DST_BASE_DIR = path.join(__dirname, 'public', 'images');
const ORIGINALS_DIR = path.join(DST_BASE_DIR, 'originals');
const THUMBS_DIR = path.join(DST_BASE_DIR, 'thumbs');

// sizes
const ORIGINAL_MAX_WIDTH = 1800;
const THUMB_SIZE = 200;
const QUALITY = 70;

async function run() {
  const files = await fs.readdir(SRC_DIR);

  const resizer = async (filename) => {
    const buffer = await fs.readFile(path.join(SRC_DIR, filename)); 
    // resize thumbs
    await sharp(buffer)
      .resize(THUMB_SIZE, THUMB_SIZE)
      .jpeg({ quality: QUALITY })
      .toFile(path.join(THUMBS_DIR, filename));
    // resize originals
    return sharp(buffer)
      .resize({ width: ORIGINAL_MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY })
      .toFile(path.join(ORIGINALS_DIR, filename));
  }
  const results = await Promise.all(files.map(filename => resizer(filename)));
  console.log(results.length + ' files have been resized');
}

run();
