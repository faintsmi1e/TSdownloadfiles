import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { stringify } from 'querystring';
const app = express();

const port = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const id = uuidv4();
    const dataPath = path.resolve(__dirname,'..', 'files', id)
    console.log(__dirname);
  

    (<any>req).uploadedId  = id;

    fs.mkdirSync(path.resolve(dataPath));
    const fileData = {
      filename: file.originalname,
      mimetype: file.mimetype,
    }
    fs.writeFileSync(path.resolve(dataPath, 'index.json'), JSON.stringify(fileData, null, 4), 'utf-8');
    cb(null, dataPath);
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
  
  res.send({status:'ok' , id:(<any>req).uploadedId });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
