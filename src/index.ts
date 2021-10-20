import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
const app = express();

const port = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const id = uuidv4();
    console.log(__dirname)

    fs.mkdirSync(path.resolve(__dirname,'..', 'files', id));
    cb(null, path.resolve('files', id));
  },
  filename: function (req, file, cb) {
    console.log('filename');

    console.log(file);

    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use('/', express.static('static'));

app.use('/filepond', express.static('node_modules/filepond/dist'));

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
