const express = require('express');
const fs = require('fs');
const path = require('path');
const route = express.Router();
const upload = require('../middleware/fileUpload');
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
route.use(bodyParser.json());

route.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, '../public/images');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ message: 'Unable to scan files!' });
        }
        const fileUrls = files.map(file => `/images/${file}`);
        res.json({ images: fileUrls });
    });
});

route.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload an image file' });
    }
    res.json({ imageUrl: `/images/${req.file.filename}` });
});

route.delete('/delete', (req, res) => {
    const { imageUrl } = req.body;
    console.log('Received request to delete:', imageUrl);

    if (!imageUrl) {
        console.error('No image URL provided');
        return res.status(400).json({ message: 'Image URL is required' });
    }

    const filename = path.basename(imageUrl);
    const filePath = path.join(__dirname, '../public/images', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File not found:', filePath);
            return res.status(404).json({ message: 'File not found' });
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({ message: 'Error deleting file' });
            }
            console.log('File deleted successfully:', filePath);
            res.json({ message: 'Image deleted successfully' });
        });
    });
});

module.exports = route;
