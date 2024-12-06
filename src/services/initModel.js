const loadModel = require('./loadModel');

const initModel = async (app) => {
  try {
    const model = await loadModel();  // Memuat model
    app.locals.model = model;  // Menyimpan hasil load model di app.locals
    console.log("Model loaded successfully");
  } catch (error) {
    console.error("Failed to load model:", error);
  }
};

module.exports = initModel