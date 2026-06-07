const express = require('express');

const router=express.Router();
const {
    registerUser,
    getUserByFirebaseUID,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/:uid',getUserByFirebaseUID);

module.exports=router;