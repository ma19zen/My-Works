"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageRoutes_1 = require("./routes/imageRoutes");
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 3000;
// html file serving route
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../index.html'));
});
// Serve (js and css) files from the front directory
app.use('/front', express_1.default.static(path_1.default.resolve(__dirname, '../front')));
// Middleware to parse JSON body
app.use(express_1.default.json());
// Serve uploaded images statically
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
// Mount image-related route
app.use('/api/images', imageRoutes_1.imageRouter);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
