import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { resizeImage, uploadImage } from '../controllers/imageController';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//  routes
router.get('/resize', resizeImage);
router.post('/upload', upload.single('image'), uploadImage);

//route to list images in uploads (I did not include resized folder)
router.get('/list', (req, res) => {
  const uploadsDir = path.resolve(__dirname, '../uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory', err);
      return res.status(500).json({ error: 'Unable to list images' });
    }
    // Filter JPG files only, I excluded 'resized' folder
    const jpgFiles = files.filter((file) => {
      const filePath = path.join(uploadsDir, file);
      const isFile = fs.statSync(filePath).isFile();
      return (
        isFile &&
        (file.toLowerCase().endsWith('.jpg') ||
          file.toLowerCase().endsWith('.jpeg'))
      );
    });
    res.json(jpgFiles);
  });
});

export { router as imageRouter };
