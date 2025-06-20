"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageController_1 = require("../controllers/imageController");
const router = express_1.default.Router();
exports.imageRouter = router;
// Multer setup
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.resolve(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
//  routes
router.get('/resize', imageController_1.resizeImage);
router.post('/upload', upload.single('image'), imageController_1.uploadImage);
//route to list images in uploads (I did not include resized folder)
router.get('/list', (req, res) => {
    const uploadsDir = path_1.default.resolve(__dirname, '../uploads');
    fs_1.default.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory', err);
            return res.status(500).json({ error: 'Unable to list images' });
        }
        // Filter JPG files only, I excluded 'resized' folder
        const jpgFiles = files.filter((file) => {
            const filePath = path_1.default.join(uploadsDir, file);
            const isFile = fs_1.default.statSync(filePath).isFile();
            return (isFile &&
                (file.toLowerCase().endsWith('.jpg') ||
                    file.toLowerCase().endsWith('.jpeg')));
        });
        res.json(jpgFiles);
    });
});
