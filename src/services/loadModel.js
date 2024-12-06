const tf = require('@tensorflow/tfjs-node');

const loadModel = async () => {
  const model = await tf.loadLayersModel(process.env.MODEL_URL);
  return model;
};

module.exports = loadModel;