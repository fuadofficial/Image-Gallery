const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Storage engine setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/images/${req.file.filename}` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
