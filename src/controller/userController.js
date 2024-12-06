const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const UserModel = require('../models/userModel');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
};

const getUser = async (req, res) => {
    try {
        const { userId } = req;

        const [user] = await UserModel.findById(userId);

        if (user.length === 0) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }

        res.json({
            error: false,
            user: {
                id: user[0].userId,
                name: user[0].name,
                email: user[0].email,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Server Error",
            serverMessage: error,
        });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({
            error: true,
            message: "Password and confirm password do not match",
        });
    }

    try {
        const [existingUser] = await UserModel.findByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({
                error: true,
                message: "Email is already in use",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = `user-${nanoid()}`;
        await UserModel.createUser({ userId, name, email, password: hashedPassword });

        res.status(201).json({
            error: false,
            message: "User Created",
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Server Error",
            serverMessage: error,
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await UserModel.findByEmail(email);
        if (user.length === 0) {
            return res.status(400).json({
                error: true,
                message: "Invalid email or password",
            });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({
                error: true,
                message: "Invalid email or password",
            });
        }

        const accessToken = generateAccessToken(user[0].userId);
        const refreshToken = generateRefreshToken(user[0].userId);

        await UserModel.saveRefreshToken(user[0].userId, refreshToken);

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        });

        res.json({
            error: false,
            message: "Success",
            loginResult: {
                userId: user[0].userId,
                name: user[0].name,
                token: accessToken,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Server Error",
            serverMessage: error.message,
        });
    }
};

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(403).json({
            error: true,
            message: "Refresh token not provided",
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const [user] = await UserModel.findById(decoded.userId);

        if (user.length === 0) {
            return res.status(403).json({
                error: true,
                message: "Invalid refresh token",
            });
        }

        const newAccessToken = generateAccessToken(user[0].userId);

        res.json({
            error: false,
            message: "New access token generated",
            accessToken: newAccessToken,
        });
    } catch (error) {
        res.status(403).json({
            error: true,
            message: "Invalid or expired refresh token",
        });
    }
};

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refresh_token; 

    if (!refreshToken) {
        return res.status(400).json({
            error: true,
            message: "Refresh token not found",
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const result = await UserModel.deleteRefreshToken(decoded.userId);

        if (result.affectedRows === 0) {
            return res.status(400).json({
                error: true,
                message: "Invalid or deleted refresh token",
            });
        }

        res.clearCookie('refresh_token');
        return res.status(200).json({
            error: false,
            message: "Success",
        });
    } catch (error) {
        return res.status(403).json({
            error: true,
            message: "Invalid or expired refresh token",
        });
    }
};

module.exports = {
    getUser,
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
};
