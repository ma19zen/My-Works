import { processImage } from '../src/utils/imageProcessor';
import fs from 'fs';
import path from 'path';

const testFilesDir = path.join(__dirname, 'test-files');
const input = path.join(testFilesDir, 'test.jpg');
const output = path.join(testFilesDir, 'resized-test.jpg');

describe('processImage', () => {
  beforeAll(() => {
    if (!fs.existsSync(testFilesDir)) throw new Error('Missing test-files/test.jpg');
  });

  it('should process image without throwing', async () => {
    await expectAsync(
      processImage(input, output, 100, 100)
    ).toBeResolved();
    expect(fs.existsSync(output)).toBeTrue();
  });

  afterAll(() => {
    if (fs.existsSync(output)) fs.unlinkSync(output);
  });
});
