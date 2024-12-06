const { getAllArticlesModels, getArticleByIdModels } = require("../models/articlesModel");

const getAllArticles = async (req, res) => {
  try {
    const [data] = await getAllArticlesModels();
    res.status(200).json({
      message: "GET all articles success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const getArticleById = async (req, res) => {
  const {idArcticle} = req.params;
  try {
    const [data] = await getArticleByIdModels(idArcticle);
    res.status(200).json({
      message: "GET detail article success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllArticles,
  getArticleById
};