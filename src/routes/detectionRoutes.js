const express = require('express');
const multer = require('multer'); //library untuk menangani multipart/form-data
const postDetection = require('../controller/detectionController');

const router = express.Router();

//konfigurasi multer dengan batasan ukuran file
const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

//rute untuk /detection dengan validasi ukuran file
router.post('/detection', upload.single('image'), (req, res, next) => {
  try {
    postDetection(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
