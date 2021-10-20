const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get( "/", ( req, res ) => {
  res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );