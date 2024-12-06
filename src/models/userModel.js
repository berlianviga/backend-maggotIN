const dbPool = require('../config/database');

const findByEmail = (email) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    return dbPool.execute(SQLQuery, [email]);
};

const findById = (userId) => {
    const SQLQuery = 'SELECT * FROM users WHERE userId = ?';
    return dbPool.execute(SQLQuery, [userId]);
};

const createUser = (user) => {
    const SQLQuery = 'INSERT INTO users (userId, name, email, password) VALUES (?, ?, ?, ?)';
    return dbPool.execute(SQLQuery, [user.userId, user.name, user.email, user.password]);
};

const saveRefreshToken = (userId, refreshToken) => {
    const SQLQuery = 'UPDATE users SET refreshToken = ? WHERE userId = ?';
    return dbPool.execute(SQLQuery, [refreshToken, userId]);
};

const deleteRefreshToken = (userId) => {
    const SQLQuery = 'UPDATE users SET refreshToken = NULL WHERE userId = ?';
    return dbPool.execute(SQLQuery, [userId]);
};

module.exports = {
    findByEmail,
    findById,
    createUser,
    saveRefreshToken,
    deleteRefreshToken,
};
