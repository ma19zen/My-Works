import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { processImage } from '../utils/imageProcessor';

const uploadsDir = path.join(__dirname, '../uploads');
const resizedDir = path.join(uploadsDir, 'resized');

if (!fs.existsSync(resizedDir)) {
  fs.mkdirSync(resizedDir, { recursive: true });
}

const fileExists = (filepath: string): boolean => fs.existsSync(filepath);

export const resizeImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { filename, width, height } = req.query;

    if (
      !filename ||
      !width ||
      !height ||
      typeof filename !== 'string' ||
      typeof width !== 'string' ||
      typeof height !== 'string'
    ) {
      res.status(400).json({
        error: 'Filename, width, and height are required and must be strings.',
      });
      return;
    }

    const widthNum = parseInt(width, 10);
    const heightNum = parseInt(height, 10);

    if (isNaN(widthNum) || isNaN(heightNum)) {
      res
        .status(400)
        .json({ error: 'Width and height must be valid numbers.' });
      return;
    }
    if (widthNum <= 0 || heightNum <= 0) {
      res
        .status(400)
        .json({ error: 'Width and height must be positive integers.' });
      return;
    }

    const sourcePath = path.join(uploadsDir, filename);
    if (!fileExists(sourcePath)) {
      res.status(404).json({ error: `Source image '${filename}' not found.` });
      return;
    }

    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    const resizedFilename = `${name}-${widthNum}x${heightNum}${ext}`;
    const resizedPath = path.join(resizedDir, resizedFilename);

    if (fileExists(resizedPath)) {
      res.sendFile(resizedPath);
      return;
    }

await processImage(sourcePath, resizedPath, widthNum, heightNum);

    res.sendFile(resizedPath);
  } catch (error) {
    console.error('Resize image error:', error);
    res
      .status(500)
      .json({ error: 'Internal server error during image processing.' });
  }
};

export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    res
      .status(400)
      .json({ error: 'No file uploaded. Please select a file to upload.' });
    return;
  }

  if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg') {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting invalid upload:', err);
    });
    res
      .status(415)
      .json({ error: 'Unsupported media type. Only JPG images are allowed.' });
    return;
  }

  res.status(201).json({
    message: `File '${req.file.originalname}' uploaded successfully.`,
    filename: req.file.filename,
  });
};
