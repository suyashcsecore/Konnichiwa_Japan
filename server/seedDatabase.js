const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const WasteItem = require('./models/WasteItem');
const CityRule = require('./models/CityRule');

dotenv.config({ path: path.join(__dirname, '.env') });

const wasteItemsData = [
  {
    "item_id": "pet_bottle",
    "name_en": "PET Bottle",
    "name_ja": "ペットボトル",
    "category_key": "pet_bottles",
    "category_ja": "ペットボトル",
    "instructions_en": "Remove cap and label. Rinse inside. Crush lightly.",
    "instructions_ja": "キャップとラベルを外し、中をすすいでお出しください。"
  },
  {
    "item_id": "aluminum_can",
    "name_en": "Aluminum / Steel Can",
    "name_ja": "缶類",
    "category_key": "recyclable_containers",
    "category_ja": "缶・ビン類",
    "instructions_en": "Rinse inside. Do not put cigarette butts or garbage inside.",
    "instructions_ja": "中をすすいでください。中に吸い殻などのごみを入れないでください。"
  },
  {
    "item_id": "glass_bottle",
    "name_en": "Glass Bottle",
    "name_ja": "ビン類",
    "category_key": "recyclable_containers",
    "category_ja": "缶・ビン類",
    "instructions_en": "Remove caps and rinse inside with water.",
    "instructions_ja": "キャップを外し、中を水ですすいでください。"
  },
  {
    "item_id": "styrofoam_tray",
    "name_en": "White Styrofoam Tray",
    "name_ja": "白色発泡スチロール・トレー",
    "category_key": "recyclable_containers",
    "category_ja": "白色発泡スチロール・トレー",
    "instructions_en": "Wash and dry completely. Only white trays are accepted.",
    "instructions_ja": "きれいに洗って乾かしてください。白色のみ対象です。"
  },
  {
    "item_id": "food_waste",
    "name_en": "Kitchen / Food Waste",
    "name_ja": "生ごみ",
    "category_key": "combustible",
    "category_ja": "可燃ごみ",
    "instructions_en": "Squeeze out as much water as possible before bagging.",
    "instructions_ja": "しっかり水切りをして指定ごみ袋に入れて出してください。"
  },
  {
    "item_id": "cardboard",
    "name_en": "Cardboard / Paper Box",
    "name_ja": "段ボール・古紙",
    "category_key": "used_paper",
    "category_ja": "古紙類",
    "instructions_en": "Flatten and tie securely with paper string.",
    "instructions_ja": "たたんでひもで縛ってお出しください。"
  },
  {
    "item_id": "rechargeable_battery",
    "name_en": "Lithium-ion / Dry Battery",
    "name_ja": "乾電池・リチウムイオン電池",
    "category_key": "batteries_tubes",
    "category_ja": "電池類・蛍光管等",
    "instructions_en": "Apply tape to positive and negative terminals to insulate.",
    "instructions_ja": "端子部分にテープを貼って絶縁処理をして出してください。"
  },
  {
    "item_id": "spray_can",
    "name_en": "Spray Can / Gas Cartridge",
    "name_ja": "スプレー缶・カセットボンベ",
    "category_key": "non_combustible",
    "category_ja": "不燃ごみ",
    "instructions_en": "Use up completely. Puncture a hole in a well-ventilated outdoor area.",
    "instructions_ja": "使い切ってから、風通しのよい屋外で穴を開けて出してください。"
  }
];

const cities = ["Tokyo", "Osaka", "Kyoto"];
const categories = [...new Set(wasteItemsData.map(w => w.category_key))];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected.');

    // Clear existing
    await WasteItem.deleteMany({});
    await CityRule.deleteMany({});

    // Seed WasteItems
    await WasteItem.insertMany(wasteItemsData);
    console.log('Seeded WasteItems.');

    // Seed CityRules (dummy data for each city and each category)
    const cityRulesData = [];
    
    for (const city of cities) {
      for (const cat of categories) {
        let day = "Monday & Thursday";
        let method = "Place in designated collection net";
        let bagReq = false;

        if (cat === "combustible") {
          day = city === "Tokyo" ? "Tuesday & Friday" : "Monday & Thursday";
          method = "Place in combustible garbage area";
          bagReq = city === "Tokyo" ? false : true;
        } else if (cat === "non_combustible") {
          day = "1st & 3rd Wednesday";
          method = "Place in non-combustible bin";
          bagReq = true;
        } else if (cat === "pet_bottles" || cat === "recyclable_containers") {
          day = "Wednesday";
          method = "Place in yellow recycling box";
          bagReq = false;
        } else if (cat === "used_paper") {
          day = "Saturday";
          method = "Bundle with string and leave at collection point";
          bagReq = false;
        } else if (cat === "batteries_tubes") {
          day = "2nd & 4th Friday";
          method = "Place in hazard bucket at collection point";
          bagReq = false;
        }

        cityRulesData.push({
          city_name: city,
          category_key: cat,
          collection_day: day,
          disposal_method: method,
          special_bag_required: bagReq
        });
      }
    }

    await CityRule.insertMany(cityRulesData);
    console.log('Seeded CityRules.');
    
    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
