const express = require('express');
const router = express.Router();
const {getBanner, updateBanner} = require('../controllers/bannerController');

// Route to get banner data
// router.get('/', bannerController.getBanner);
router.route("/").get(getBanner);
router.route("/").post(updateBanner);

module.exports = router;