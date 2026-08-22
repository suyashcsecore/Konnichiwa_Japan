const mongoose = require('mongoose');

const wasteItemSchema = new mongoose.Schema({
  item_id: { type: String, required: true, unique: true },
  name_en: { type: String, required: true },
  name_ja: { type: String, required: true },
  category_key: { type: String, required: true },
  category_ja: { type: String, required: true },
  instructions_en: { type: String, required: true },
  instructions_ja: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('WasteItem', wasteItemSchema);
