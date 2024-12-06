const tf = require('@tensorflow/tfjs-node');

const detectClassification = async (model, image) => {
  // Decode image, resize, normalize, and add batch dimension
  const tensor = tf.node
    .decodeImage(image, 3) // Decode image to RGB (3 channels)
    .resizeNearestNeighbor([128, 128]) // Resize to 128x128
    .toFloat() // Convert to float32
    .div(255.0) // Normalize pixel values to [0, 1]
    .expandDims(0); // Add batch dimension: [1, 128, 128, 3]
  
  console.log(tensor.shape);

  // Predict with the model
  const detection = model.predict(tensor);

  // Get confidence scores
  const scores = await detection.data();
  const confidenceScore = Math.max(...scores) * 100;

  // Map to classes
  const classes = ['Larva Tahap 1', 'Larva Tahap 2', 'Larva Tahap 3', 'Maggot', 'Prepupa', 'Pupa'];
  const classIndex = tf.argMax(detection, 1).dataSync()[0];
  const label = classes[classIndex];

  return { confidenceScore, label };
};

module.exports = detectClassification;

 