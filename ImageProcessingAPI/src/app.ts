import express from 'express';
import path from 'path';
import { imageRouter } from './routes/imageRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// html file serving route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve (js and css) files from the front directory
app.use('/front', express.static(path.resolve(__dirname, '../front')));

// Middleware to parse JSON body
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount image-related route
app.use('/api/images', imageRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export { app };
