const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');
router.post('/createProfile', authMiddleware.verifyToken, profileController.createProfile);
router.patch('/updateProfile', authMiddleware.verifyToken, profileController.updateProfile);
router.get('/:userId/profile',authMiddleware.verifyToken,profileController.checkProfile);

module.exports = router;