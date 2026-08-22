const mongoose = require('mongoose');

const cityRuleSchema = new mongoose.Schema({
  city_name: { type: String, required: true },
  category_key: { type: String, required: true },
  collection_day: { type: String, required: true }, // e.g., "Tuesday & Friday"
  disposal_method: { type: String, required: true }, // e.g., "Place in designated collection box"
  special_bag_required: { type: Boolean, required: true, default: false },
}, { timestamps: true });

// Compound index to ensure one rule per city per category
cityRuleSchema.index({ city_name: 1, category_key: 1 }, { unique: true });

module.exports = mongoose.model('CityRule', cityRuleSchema);
