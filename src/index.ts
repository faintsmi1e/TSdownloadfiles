import express from 'express';
const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static('static'));

app.use('/filepond', express.static('node_modules/filepond/dist'));

app.get('/ping', (req, res) => {
  res.send('pong');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
