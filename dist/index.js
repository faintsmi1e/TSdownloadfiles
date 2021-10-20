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
        const dataPath = path_1.default.resolve(__dirname, '..', 'files', id);
        console.log(__dirname);
        req.uploadedId = id;
        fs_1.default.mkdirSync(path_1.default.resolve(dataPath));
        const fileData = {
            filename: file.originalname,
            mimetype: file.mimetype,
        };
        fs_1.default.writeFileSync(path_1.default.resolve(dataPath, 'index.json'), JSON.stringify(fileData, null, 4), 'utf-8');
        cb(null, dataPath);
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
    res.send({ status: 'ok', id: req.uploadedId });
});
app.get('/d/:id', (req, res) => {
    const id = req.params.id;
    const dataPath = path_1.default.resolve(__dirname, '..', 'files', id);
    const indexJsonPath = path_1.default.resolve(dataPath, 'index.json');
    const fileData = fs_1.default.readFileSync(indexJsonPath);
    const filename = JSON.parse(fileData).filename;
    res.download(path_1.default.resolve(dataPath, filename));
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map