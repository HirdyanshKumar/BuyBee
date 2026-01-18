const express = require('express');

const { verifyAuth } = require('../middlewares/auth.middleware');

const router = express.Router();    

router.get('/profile', verifyAuth,(req,res)=>{
    return res.status(200).json({message:"User profile accessed"});
} );

module.exports = router;