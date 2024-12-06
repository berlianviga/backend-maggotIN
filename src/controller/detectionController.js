//handler atau controller untuk deteksi
const detectClassification = require('../services/inferenceService');
const postDetection = async (req, res) => {
  try {
    const {image} = req.file;
  } catch (error) {
    
  }
}

module.exports = postDetection;