const dbPool = require('../config/database');

const getAllArticlesModels = () => {
  const SQLQuery = "SELECT * FROM articles";

  return dbPool.query(SQLQuery);
}

const getArticleByIdModels = (idArticle) => {
  const SQLQuery = `SELECT * FROM articles WHERE id = ${idArticle}`;

  return dbPool.query(SQLQuery, [idArticle]);
}

module.exports = {
  getAllArticlesModels,
  getArticleByIdModels
};