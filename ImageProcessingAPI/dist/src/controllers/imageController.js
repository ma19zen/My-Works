"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadsDir = path_1.default.join(__dirname, '../uploads');
const resizedDir = path_1.default.join(uploadsDir, 'resized');
if (!fs_1.default.existsSync(resizedDir)) {
    fs_1.default.mkdirSync(resizedDir, { recursive: true });
}
const fileExists = (filepath) => fs_1.default.existsSync(filepath);
const resizeImage = async (req, res) => {
    try {
        const { filename, width, height } = req.query;
        if (!filename ||
            !width ||
            !height ||
            typeof filename !== 'string' ||
            typeof width !== 'string' ||
            typeof height !== 'string') {
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
        const sourcePath = path_1.default.join(uploadsDir, filename);
        if (!fileExists(sourcePath)) {
            res.status(404).json({ error: `Source image '${filename}' not found.` });
            return;
        }
        const ext = path_1.default.extname(filename);
        const name = path_1.default.basename(filename, ext);
        const resizedFilename = `${name}-${widthNum}x${heightNum}${ext}`;
        const resizedPath = path_1.default.join(resizedDir, resizedFilename);
        if (fileExists(resizedPath)) {
            res.sendFile(resizedPath);
            return;
        }
        await (0, sharp_1.default)(sourcePath).resize(widthNum, heightNum).toFile(resizedPath);
        res.sendFile(resizedPath);
    }
    catch (error) {
        console.error('Resize image error:', error);
        res
            .status(500)
            .json({ error: 'Internal server error during image processing.' });
    }
};
exports.resizeImage = resizeImage;
const uploadImage = (req, res) => {
    if (!req.file) {
        res
            .status(400)
            .json({ error: 'No file uploaded. Please select a file to upload.' });
        return;
    }
    if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg') {
        fs_1.default.unlink(req.file.path, (err) => {
            if (err)
                console.error('Error deleting invalid upload:', err);
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
exports.uploadImage = uploadImage;
