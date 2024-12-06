const express = require('express');
const { getAllArticles, getArticleById } = require('../controller/articlesController');


const router = express.Router();

//READ - GET articles
router.get('/', getAllArticles);

//READ - GET detail article
router.get('/:idArcticle', getArticleById);

module.exports = router;