"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const id = (0, uuid_1.v4)();
        console.log(__dirname);
        fs_1.default.mkdirSync(path_1.default.resolve(__dirname, '..', 'files', id));
        cb(null, path_1.default.resolve('files', id));
    },
    filename: function (req, file, cb) {
        console.log('filename');
        console.log(file);
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.use('/', express_1.default.static('static'));
app.use('/filepond', express_1.default.static('node_modules/filepond/dist'));
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.post('/upload', upload.single('filepond'), (req, res) => {
    res.send('upload');
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map