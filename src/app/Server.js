//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.get('/*', (req, res) =>
    res.sendFile('app.component.html', {root: 'dist/sehir-rehberi-spa/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);