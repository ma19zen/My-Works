import request from 'supertest';
import fs from 'fs';
import path from 'path';
import { app } from '../src/app';

const uploadsDir = path.join(__dirname, '../src/uploads');
const resizedDir = path.join(uploadsDir, 'resized');
const testImagePath = path.join(__dirname, 'test-files/test.jpg');
const uploadEndpoint = '/api/images/upload';
const resizeEndpoint = '/api/images/resize';

describe('Image Controller', () => {
  const uploadedFilename = 'test.jpg';

  beforeAll(() => {
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    if (!fs.existsSync(resizedDir)) fs.mkdirSync(resizedDir, { recursive: true });
    const testFilesDir = path.join(__dirname, 'test-files');
    if (!fs.existsSync(testFilesDir)) fs.mkdirSync(testFilesDir);
    if (!fs.existsSync(testImagePath)) throw new Error('Test image file (test.jpg) is missing.');
  });

  it('should upload a valid JPG image', async () => {
    const res = await request(app).post(uploadEndpoint).attach('image', testImagePath);
    expect(res.status).toBe(201);
    expect(res.body.filename).toBe(uploadedFilename);
    expect(fs.existsSync(path.join(uploadsDir, uploadedFilename))).toBe(true);
  });

  it('should reject unsupported file types', async () => {
    const fakeTextPath = path.join(__dirname, 'test-files/fake.txt');
    fs.writeFileSync(fakeTextPath, 'not an image');
    const res = await request(app).post(uploadEndpoint).attach('image', fakeTextPath);
    expect(res.status).toBe(415);
    fs.unlinkSync(fakeTextPath);
  });

  it('should resize an uploaded image', async () => {
    const res = await request(app).get(`${resizeEndpoint}?filename=${uploadedFilename}&width=100&height=100`);
    const resizedFile = path.join(resizedDir, 'test-100x100.jpg');
    expect(res.status).toBe(200);
    expect(fs.existsSync(resizedFile)).toBe(true);
  });

  it('should return 404 for nonexistent images', async () => {
    const res = await request(app).get(`${resizeEndpoint}?filename=nonexistent.jpg&width=100&height=100`);
    expect(res.status).toBe(404);
  });

  it('should return 400 for missing query params', async () => {
    const res = await request(app).get(`${resizeEndpoint}?filename=${uploadedFilename}`);
    expect(res.status).toBe(400);
  });

  it('should return 400 for negative dimensions', async () => {
    const res = await request(app).get(`${resizeEndpoint}?filename=${uploadedFilename}&width=-100&height=-100`);
    expect(res.status).toBe(400);
  });

  afterAll(() => {
    const resized = path.join(resizedDir, 'test-100x100.jpg');
    if (fs.existsSync(resized)) fs.unlinkSync(resized);
  });
});
