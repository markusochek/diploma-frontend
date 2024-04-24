const express = require('express');
const expressFileUpload = require('express-fileupload');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressFileUpload());
app.use(express.static('public'));
app.listen(3001);