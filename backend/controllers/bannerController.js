const Banner = require('../models/bannerModel');

// Get banner data
const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({});
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    return res.status(200).json(banner); // Use 200 OK for successful data retrieval
  } catch (error) {
    console.error('Error fetching banner data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update banner data
const updateBanner = async (req, res) => {
  const { description, link, endDate, isVisible } = req.body;
  console.log(req.body);
  try {
    const result = await Banner.findOneAndUpdate(
      {},
      { description, link, endDate, isVisible },
      { new: true, upsert: true }
    );
    return res.status(200).json(result); // Use 200 OK to indicate successful update
  } catch (error) {
    console.error('Error updating banner data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBanner, updateBanner };
