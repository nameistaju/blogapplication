
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/verify', protect, verifyToken);

module.exports = router;
