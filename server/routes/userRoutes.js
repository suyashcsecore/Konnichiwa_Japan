const express = require('express');
const { syncUser, updateCity } = require('../controllers/userController');
const router = express.Router();

router.post('/sync', syncUser);
router.put('/city', updateCity);

module.exports = router;
