const express = require('express');
const fs = require('fs');
const path = require('path');
const route = express.Router();
const upload = require('../middleware/fileUpload');

route.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, '../public/images');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send({ message: 'Unable to scan files!' });
        }
        const fileUrls = files.map(file => `/images/${file}`);
        res.json({ images: fileUrls });
    });
});

route.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload an image file' });
    }
    res.json({ imageUrl: `/images/${req.file.filename}` });
});

module.exports = route