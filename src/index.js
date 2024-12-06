require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const articleRouters = require('./routes/articlesRoutes');
const detectionRoutes = require('./routes/detectionRoutes');
const errorHandler = require('./middleware/errorHandler');
const initModel = require('./services/initModel');

const app = express();
const PORT = process.env.PORT || 4000;

//untuk memuat model sebelum memulai server
initModel(app);

app.use(express.json());
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(userRoutes);
app.use('/articles', articleRouters);
app.use(errorHandler);
app.use(detectionRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});