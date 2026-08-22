const User = require('../models/User');

const syncUser = async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, profileImageUrl } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: 'Missing required user data' });
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        clerkId,
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        profileImageUrl: profileImageUrl || ''
      },
      { upsert: true, new: true } // Creates the user if they don't exists
    );

    console.log(`Synced user to MongoDB: ${email}`);
    res.status(200).json({ success: true, user });

  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Failed to sync user data' });
  }
};

const updateCity = async (req, res) => {
  try {
    const { clerkId, city } = req.body;
    if (!clerkId) {
      return res.status(400).json({ error: 'Missing clerkId' });
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      { city },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ error: 'Failed to update city' });
  }
};

module.exports = {
  syncUser,
  updateCity
};
