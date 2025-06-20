import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const processImage = async (
  sourcePath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  if (!fs.existsSync(sourcePath)) throw new Error('Source image not found');
  await sharp(sourcePath).resize(width, height).toFile(outputPath);
};
