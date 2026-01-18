const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const { verifyuser } = require('../middlewares/auth.middleware');

const router = express.Router();    

router.get('/profile', verifyuser, getUserProfile);