// Japan Smart Waste Data Engine - GomiGuide AI (スマート分別 AI)

export const WASTE_CATEGORIES = {
  burnable: {
    id: "burnable",
    nameEn: "Burnable Waste",
    nameJa: "可燃ごみ (もえるごみ)",
    icon: "🥬",
    color: "#e63946",
    bgColor: "#ffe5ec",
    symbol: "燃",
    descriptionEn: "Combustible household kitchen waste, soiled paper, small wooden items, rubber/leather, and non-recyclable organics.",
    descriptionJa: "生ごみ、紙くず、汚れたプラスチック、ゴム・革製品、木くずなど焼却処分されるごみ。",
    bagTypeEn: "Designated semi-transparent yellow/white municipal bag (45L/30L/20L)",
    bagTypeJa: "自治体指定の可燃ごみ用半透明袋 (45L/30L/20L)",
    scheduleFrequency: "2 times per week (typically Tuesday & Friday)"
  },
  plastic: {
    id: "plastic",
    nameEn: "Recyclable Plastic Containers",
    nameJa: "容器包装プラスチック (プラマーク)",
    icon: "♻️",
    color: "#ff4d6d",
    bgColor: "#fff0f3",
    symbol: "プラ",
    descriptionEn: "Clean plastic packaging displaying the official Japanese [プラ] symbol (trays, wrappers, bottle caps, film).",
    descriptionJa: "プラマークのついたプラスチック製の容器や包装（トレイ、袋、フィルム、キャップなど）。汚れは水でゆすいでください。",
    bagTypeEn: "Transparent or designated clear pink/blue bag",
    bagTypeJa: "透明または半透明の袋（指定袋がある自治体は指定袋）",
    scheduleFrequency: "1 time per week (typically Wednesday)"
  },
  pet: {
    id: "pet",
    nameEn: "PET Bottles",
    nameJa: "ペットボトル (PETマーク)",
    icon: "🧴",
    color: "#0077b6",
    bgColor: "#e0f2fe",
    symbol: "PET",
    descriptionEn: "Clear beverage, soy sauce, and mirin bottles carrying the triangular [PET 1] mark.",
    descriptionJa: "飲料用、しょうゆ・みりん等のペットボトル（三角のPETマーク付き）。キャップとラベルを必ず剥がしてください。",
    bagTypeEn: "Dedicated netting station or clear bag",
    bagTypeJa: "収集場所の専用ネット袋または透明袋",
    scheduleFrequency: "Bi-weekly or 1 time per week"
  },
  cans: {
    id: "cans",
    nameEn: "Cans (Aluminum & Steel)",
    nameJa: "缶 (アルミ缶・スチール缶)",
    icon: "🥫",
    color: "#f77f00",
    bgColor: "#fef3c7",
    symbol: "缶",
    descriptionEn: "Beverage and food cans made of aluminum (アルミ) or steel (スチール).",
    descriptionJa: "飲料・食品用のアルミ缶・スチール缶。中をすすいで集積所の専用コンテナへ。",
    bagTypeEn: "Yellow/Blue plastic collection crates at pickup point",
    bagTypeJa: "集積所の専用回収コンテナ（黄色／青色）へ直接投入",
    scheduleFrequency: "1 time per week or bi-weekly (typically Thursday)"
  },
  glass: {
    id: "glass",
    nameEn: "Glass Bottles",
    nameJa: "びん (ガラス瓶)",
    icon: "🍾",
    color: "#2a9d8f",
    bgColor: "#e8f5e9",
    symbol: "びん",
    descriptionEn: "Beverage, medicine, and food glass bottles separated by color (clear, brown, green).",
    descriptionJa: "飲料用、調味料用、医薬品のガラスびん。キャップを取り外し、中を軽くゆすぐ。",
    bagTypeEn: "Blue/Green crates at collection stations",
    bagTypeJa: "集積所の専用回収コンテナへ直接投入（無色・茶色・その他で色分け）",
    scheduleFrequency: "1 time per week or bi-weekly"
  },
  paper: {
    id: "paper",
    nameEn: "Recyclable Paper & Cardboard",
    nameJa: "古紙・段ボール・紙パック",
    icon: "📦",
    color: "#a05a2c",
    bgColor: "#f5ebe0",
    symbol: "紙",
    descriptionEn: "Newspapers, corrugated cardboard boxes, magazines, flyers, and rinsed milk cartons.",
    descriptionJa: "新聞紙、雑誌、段ボール、紙パック、雑がみ。品目ごとにビニール紐で十字に縛って出します。",
    bagTypeEn: "Cross-tied with paper/poly string (no bags)",
    bagTypeJa: "紙ひもまたはビニールひもで十字に結束（袋には入れない）",
    scheduleFrequency: "Bi-weekly or 1 time per week (typically Saturday)"
  },
  nonburnable: {
    id: "nonburnable",
    nameEn: "Non-Burnable Waste",
    nameJa: "不燃ごみ (もえないごみ)",
    icon: "🧊",
    color: "#6c757d",
    bgColor: "#f8f9fa",
    symbol: "不燃",
    descriptionEn: "Ceramics, glassware, metal cooking utensils, mirrors, light bulbs, small appliances under 30cm.",
    descriptionJa: "陶磁器、ガラス製品、金属製調理器具、傘、30cm未満の小型家電製品など。",
    bagTypeEn: "Designated transparent non-burnable bag",
    bagTypeJa: "指定の不燃ごみ用透明袋（危険物は厚紙に包んで「キケン」と明記）",
    scheduleFrequency: "Twice a month (e.g., 2nd & 4th Tuesday)"
  },
  hazardous: {
    id: "hazardous",
    nameEn: "Hazardous & Special Waste",
    nameJa: "有害ごみ・危険物",
    icon: "🔋",
    color: "#d90429",
    bgColor: "#ffe3e3",
    symbol: "有害",
    descriptionEn: "Dry batteries, button cells, rechargeable lithium batteries, aerosol spray cans, gas canisters, mercury thermometers.",
    descriptionJa: "乾電池、リチウムイオン電池、スプレー缶、カセットボンベ、蛍光灯、体温計など。火災防止のため他と絶対混ぜない。",
    bagTypeEn: "Separate transparent bag labeled 'Hazardous' or drop box at Combini/Ward Office",
    bagTypeJa: "透明袋に「有害」と記載して別出し、または区役所・家電量販店の回収ボックスへ",
    scheduleFrequency: "Designated days or permanent drop-box collection"
  },
  bulky: {
    id: "bulky",
    nameEn: "Bulky Waste (Sodai Gomi)",
    nameJa: "粗大ごみ (一辺30cm以上)",
    icon: "🛋️",
    color: "#590d22",
    bgColor: "#fae1dd",
    symbol: "粗大",
    descriptionEn: "Furniture, mattresses, bicycles, and household items with any dimension exceeding 30cm. Requires advance ticket/sticker booking.",
    descriptionJa: "一辺が30cmを超える家具、自転車、寝具など。事前申し込みと「粗大ごみ処理券（有料シール）」の購入・貼付が必須です。",
    bagTypeEn: "Affix Paid Municipal Waste Processing Sticker (A/B 券)",
    bagTypeJa: "コンビニで購入した「粗大ごみ処理券シール」を貼り付けて指定日時に排出",
    scheduleFrequency: "By Appointment Only (Reservation required via Ward portal or phone)"
  }
};

export const SAMPLE_WASTE_ITEMS = [
  {
    id: "bento-box",
    nameEn: "Tokyo Convenience Bento Box",
    nameJa: "コンビニ弁当容器 (箸・仕切り付き)",
    image: "🍱",
    visualClass: "bento-card",
    primaryCategory: "plastic",
    confidence: 0.98,
    composition: [
      { partEn: "Base Tray (PS/PP)", partJa: "容器本体 (PS/PP)", category: "plastic", mark: "プラ" },
      { partEn: "Transparent Lid", partJa: "透明フタ (PET/OPS)", category: "plastic", mark: "プラ" },
      { partEn: "Disposable Wooden Chopsticks", partJa: "割り箸 (木製)", category: "burnable", mark: "燃" },
      { partEn: "Sauce Packet & Grease Residue", partJa: "醤油・タレ小袋 & 食べ残し", category: "burnable", mark: "燃" }
    ],
    prepStepsEn: [
      "Remove leftover food and disposable wooden chopsticks (throw in Burnable waste).",
      "Rinse the plastic container and clear lid under tap water to remove oil and sauces.",
      "If heavy oil cannot be cleaned, dispose of the dirty tray in Burnable waste.",
      "Stack clean dry trays and place in the [プラ] Recyclable Plastic transparent bag."
    ],
    prepStepsJa: [
      "食べ残しや木製の割り箸を取り出し、可燃ごみへ入れます。",
      "容器とフタを水で軽くすすぎ、油分やタレの汚れを落とします。",
      "油汚れがひどく落ちない場合は、無理せず「可燃ごみ」として出してください。",
      "乾かした綺麗な容器を重ねて「プラマーク専用袋」へ入れます。"
    ],
    designatedBag: "Clear transparent bag with [プラ] mark",
    proTipEn: "Japanese recycling centers will reject entire bags if contaminated with food oil. 10 seconds of rinsing protects community recycling!",
    proTipJa: "油汚れが付着したプラごみはリサイクルできません。水洗いで落ちない場合は可燃ごみへ！"
  },
  {
    id: "pet-bottle",
    nameEn: "Green Tea PET Bottle with Cap & Label",
    nameJa: "緑茶ペットボトル (キャップ・ラベル付き)",
    image: "🧴",
    visualClass: "pet-card",
    primaryCategory: "pet",
    confidence: 0.99,
    composition: [
      { partEn: "Bottle Body (Clear Polyethylene Terephthalate)", partJa: "ボトル本体 (PET)", category: "pet", mark: "PET 1" },
      { partEn: "Screw Cap (Polypropylene)", partJa: "キャップ (PP)", category: "plastic", mark: "プラ" },
      { partEn: "Perforated Vinyl Label", partJa: "ミシン目付きフィルムラベル (PS)", category: "plastic", mark: "プラ" }
    ],
    prepStepsEn: [
      "Empty any remaining tea and rinse the inside thoroughly with clean water.",
      "Unscrew the plastic cap -> Place in [プラ] Recyclable Plastic bin.",
      "Tear along the perforated line to peel off the wrap label -> Place in [プラ] bin.",
      "Step on or compress the bottle body flat to save storage space.",
      "Place crushed clear bottle into the dedicated blue PET collection mesh net or clear bag."
    ],
    prepStepsJa: [
      "中身を完全に空にして、水で中を綺麗にすすぎます。",
      "プラスチックキャップを外す -> 「プラマーク」ごみへ。",
      "ミシン目に沿ってフィルムラベルを剥がす -> 「プラマーク」ごみへ。",
      "ボトルの胴体を手や足でペシャンコに潰します。",
      "集積所の専用PET回収ネットまたは透明袋に入れます。"
    ],
    designatedBag: "Dedicated blue mesh net at collection point or clear bag",
    proTipEn: "Never throw caps or labels into the PET bin. Japan separates caps because cap resin (PP/PE) has a different melting point than PET resin!",
    proTipJa: "キャップと本体は溶融温度が異なる樹脂です。3分割（本体・キャップ・ラベル）が日本の鉄則です！"
  },
  {
    id: "aluminum-can",
    nameEn: "Asahi Beer / Soda Aluminum Can",
    nameJa: "ビール・炭酸飲料アルミ缶",
    image: "🥫",
    visualClass: "can-card",
    primaryCategory: "cans",
    confidence: 0.97,
    composition: [
      { partEn: "Aluminum Body & Stay-on Tab", partJa: "缶本体 & プルタブ (アルミ)", category: "cans", mark: "アルミ" }
    ],
    prepStepsEn: [
      "Empty any remaining liquid contents completely down the sink.",
      "Rinse with water once to prevent odor and insect attraction.",
      "Leave pull-tab attached to the can (do not rip it off).",
      "Do NOT crush unless specified by your local ward (some automated scanners prefer uncrushed cans).",
      "Place into the yellow/blue 'Cans' collection container on collection morning."
    ],
    prepStepsJa: [
      "飲み残しを流し台に完全に空けます。",
      "悪臭や虫の発生を防ぐため、水でサッと中をゆすぎます。",
      "プルトップ（タブ）は外さずにつけたままにします。",
      "自治体の指示に従い（自動選別機のため潰さず出す地域が多いです）、集積所の専用コンテナへ投入します。"
    ],
    designatedBag: "Municipal Yellow/Blue Crate at collection point",
    proTipEn: "Cigarette butts inside drink cans invalidate the can for recycling and pose a hazard to sanitation workers.",
    proTipJa: "缶の中に吸い殻やゴミを絶対に入れないでください！リサイクル不可になります。"
  },
  {
    id: "spray-can",
    nameEn: "Aerosol Deodorant / Hair Spray Can",
    nameJa: "スプレー缶・ヘアスプレー・カセットボンベ",
    image: "💨",
    visualClass: "hazard-card",
    primaryCategory: "hazardous",
    confidence: 0.96,
    composition: [
      { partEn: "Pressurized Metal Can", partJa: "金属缶本体", category: "hazardous", mark: "有害" },
      { partEn: "Plastic Nozzle Cap", partJa: "プラスチック製ノズル・キャップ", category: "plastic", mark: "プラ" }
    ],
    prepStepsEn: [
      "Use up the contents completely until no hissing gas sound is emitted when pressing nozzle.",
      "Go outdoors into a well-ventilated open area away from any flame or sparks.",
      "Remove the plastic cap and nozzle -> Dispose in [プラ] Plastic.",
      "Check your ward rules: Shibuya/Shinjuku request NO puncture (put in clear bag marked 'スプレー缶'); others require safe degas tool.",
      "Place in a separate transparent bag so workers can immediately identify it."
    ],
    prepStepsJa: [
      "シューという音がしなくなるまで、中身を完全に使い切ります。",
      "火気のない、風通しの良い屋外でガス抜きキャップ等を使い残ガスを抜きます。",
      "プラスチックのキャップ・ノズルを外して「プラ」へ。",
      "自治体ルールを確認（東京23区の多くは『穴あけ不要』で中身が見える透明袋に『スプレー缶』と明記）。",
      "収集車の火災爆発事故を防ぐため、他のごみとは絶対に混ぜないでください。"
    ],
    designatedBag: "Clear transparent bag labeled 'スプレー缶' (Spray Can)",
    proTipEn: "Never mix pressurized canisters with regular metal or burnables. They cause severe garbage truck fires in Tokyo every year!",
    proTipJa: "ゴミ収集車の爆発火災事故原因の第1位です。他の不燃・可燃ごみと絶対に混ぜないでください。"
  },
  {
    id: "broken-mug",
    nameEn: "Broken Ceramic Coffee Mug & Glass",
    nameJa: "割れた陶器マグカップ・ガラスコップ",
    image: "☕",
    visualClass: "nonburn-card",
    primaryCategory: "nonburnable",
    confidence: 0.95,
    composition: [
      { partEn: "Ceramic / Broken Pottery Shards", partJa: "陶磁器・破片", category: "nonburnable", mark: "不燃" }
    ],
    prepStepsEn: [
      "Carefully wrap the broken shards securely in several layers of thick newspaper or cardboard.",
      "Seal with packing tape so sharp edges cannot puncture through.",
      "Use a bold red marker to write 'キケン' (DANGER) or '割れ物' (FRAGILE) on the outside paper.",
      "Place inside your standard transparent non-burnable municipal bag.",
      "Put out on the designated Non-Burnable collection morning by 8:00 AM."
    ],
    prepStepsJa: [
      "破片を厚手の新聞紙や段ボールで何重にもしっかりと包みます。",
      "鋭利な角が飛び出さないようにガムテープで留めます。",
      "包み紙の表面に、赤い太字ペンで『キケン』または『割れ物』と大きく書きます。",
      "自治体指定の不燃ごみ用透明袋に入れます。",
      "朝8時までに指定集積所へ出します。"
    ],
    designatedBag: "Designated Non-Burnable Transparent Bag with red 'キケン' warning",
    proTipEn: "Sanitation workers in Japan handle bags by hand. Wrapping sharp objects prevents severe puncture injuries.",
    proTipJa: "作業員の方の手のケガを防ぐため、日本のマナーとして『キケン』の赤字表記が必須です。"
  },
  {
    id: "lithium-battery",
    nameEn: "Lithium-ion Battery & Alkaline Cells",
    nameJa: "リチウムイオン電池・モバイルバッテリー・乾電池",
    image: "🔋",
    visualClass: "hazard-card",
    primaryCategory: "hazardous",
    confidence: 0.99,
    composition: [
      { partEn: "Lithium Power Cell", partJa: "充電式リチウム電池セル", category: "hazardous", mark: "有害" }
    ],
    prepStepsEn: [
      "Insulate both positive (+) and negative (-) metal terminals with clear tape or electrical tape.",
      "Never puncture, crush, or submerge in water.",
      "Do NOT place in standard residential curbside bags.",
      "Take to yellow battery collection boxes located at electronics stores (Bic Camera, Yodobashi) or your Ward Office.",
      "For standard AA/AAA alkaline batteries: put in transparent bag marked '乾電池' on designated hazardous day."
    ],
    prepStepsJa: [
      "ショートを防ぐため、プラス極とマイナス極の金属端子にセロハンテープやビニールテープを貼って絶縁します。",
      "絶対に分解・変形・水没させないでください。",
      "通常の集積所のごみ袋には絶対に出さないでください。",
      "ビックカメラ、ヨドバシカメラ等の家電量販店や区役所設置の『小型充電式電池回収BOX（JBRC）』へ持ち込みます。",
      "乾電池（アルカリ・マンガン）は月2回の有害ごみ回収日に透明袋で出します。"
    ],
    designatedBag: "Store Drop-off Box (JBRC Yellow Box) or Transparent bag for dry cells",
    proTipEn: "Lithium-ion batteries compressed in waste compactor trucks spark explosive chemical fires. Always use yellow recycling boxes!",
    proTipJa: "パッカー車内で圧縮されると激しく発火・爆発します。必ずリサイクル協力店の回収BOXへ！"
  },
  {
    id: "styrofoam-tray",
    nameEn: "Supermarket White Meat / Fish Tray",
    nameJa: "スーパーの発泡スチロール食品トレイ (白・柄付き)",
    image: "🥩",
    visualClass: "plastic-card",
    primaryCategory: "plastic",
    confidence: 0.96,
    composition: [
      { partEn: "Expanded Polystyrene (PSP)", partJa: "発泡ポリスチレン (PSP)", category: "plastic", mark: "プラ / トレイ" }
    ],
    prepStepsEn: [
      "Wash off all meat/fish juices, blood, and marinade with soap and cold water.",
      "Dry thoroughly with a towel or rack.",
      "Option 1 (Best): Drop clean white trays into the dedicated collection box at your local supermarket (Life, Aeon, Seiyu).",
      "Option 2: Place in your household [プラ] Recyclable Plastic bag.",
      "If stained with curry or burned grease that won't wash off: dispose in Burnable waste."
    ],
    prepStepsJa: [
      "肉や魚のドリップ、油分、タレを台所用洗剤と水でキレイに洗います。",
      "水気をしっかり切って乾燥させます。",
      "方法1（推奨）: スーパー（ライフ、イオン、西友等）の店頭回収ボックスへ戻す（高品質リサイクル）。",
      "方法2: 家庭の「プラマーク」専用袋へ入れて収集日に出す。",
      "カレーの着色や油汚れが落ちないものは「可燃ごみ」へ。"
    ],
    designatedBag: "Supermarket In-Store Drop Box or [プラ] Clear Bag",
    proTipEn: "Supermarket collection boxes turn clean white trays directly back into new trays (Tray-to-Tray closed loop)!",
    proTipJa: "スーパー店頭の回収箱に入れると、再び食品トレイへと生まれ変わるクローズドリサイクルが行われます。"
  },
  {
    id: "umbrella",
    nameEn: "Clear Vinyl Umbrella (Kasa)",
    nameJa: "ビニール傘 (プラスチック・金属骨)",
    image: "☂️",
    visualClass: "nonburn-card",
    primaryCategory: "nonburnable",
    confidence: 0.94,
    composition: [
      { partEn: "Steel / Fiberglass Ribs & Shaft", partJa: "金属骨・中棒", category: "nonburnable", mark: "不燃" },
      { partEn: "Vinyl Fabric Canopy", partJa: "ビニール布地", category: "burnable", mark: "燃 / プラ" },
      { partEn: "Plastic Handle & Tip", partJa: "手元プラスチック", category: "plastic", mark: "プラ" }
    ],
    prepStepsEn: [
      "Check length: umbrellas under 30cm-50cm are usually accepted in Non-Burnable; over 50cm may require special bundled non-burnable or Sodai Gomi.",
      "If required by your ward: cut off the clear vinyl fabric (Burnable) and bundle the metal frame (Non-Burnable).",
      "Bundle with string or rubber band so it doesn't open during handling.",
      "Place upright next to Non-Burnable collection bins."
    ],
    prepStepsJa: [
      "長さの確認：多くの区では傘は『不燃ごみ』ですが、骨とビニールを分解するルールもあります。",
      "骨組みからビニール生地をハサミで切り離す（ビニールは可燃/プラ、骨組みは不燃）。",
      "傘が開かないようにヒモや輪ゴムでしっかりと縛ります。",
      "不燃ごみの収集日の朝、袋からはみ出す場合はそのまま束ねて出します。"
    ],
    designatedBag: "Tied bundle alongside Non-Burnables",
    proTipEn: "Tokyo discards over 8 million vinyl umbrellas a year. Consider donating functioning umbrellas to umbrella-sharing hubs (Aikasa)!",
    proTipJa: "壊れていないビニール傘はアイカサ（Aikasa）等の傘シェアスポットやリユースステーションへ！"
  }
];

export const SEARCH_DATABASE = [
  { nameEn: "Bento container (plastic)", nameJa: "弁当箱 (プラスチック)", category: "plastic", mark: "プラ" },
  { nameEn: "Plastic drink bottle (PET)", nameJa: "ペットボトル (PET)", category: "pet", mark: "PET 1" },
  { nameEn: "Aluminum drink can", nameJa: "アルミ缶", category: "cans", mark: "アルミ" },
  { nameEn: "Steel food/tuna can", nameJa: "スチール缶・ツナ缶", category: "cans", mark: "スチール" },
  { nameEn: "Glass wine/beer bottle", nameJa: "ワイン・ビールガラス瓶", category: "glass", mark: "びん" },
  { nameEn: "Cardboard delivery box", nameJa: "段ボール箱", category: "paper", mark: "紙 / 段ボール" },
  { nameEn: "Milk carton (rinsed & cut flat)", nameJa: "牛乳パック (開いて乾燥)", category: "paper", mark: "紙パック" },
  { nameEn: "Newspaper & flyers", nameJa: "新聞紙・チラシ", category: "paper", mark: "紙" },
  { nameEn: "Kitchen food scraps (organic)", nameJa: "生ごみ (料理くず・野菜くず)", category: "burnable", mark: "燃" },
  { nameEn: "Wooden chopsticks (waribashi)", nameJa: "割り箸 (木製)", category: "burnable", mark: "燃" },
  { nameEn: "Used tissue & kitchen paper", nameJa: "ティッシュペーパー・キッチンペーパー", category: "burnable", mark: "燃" },
  { nameEn: "Soiled paper pizza box", nameJa: "ピザの箱 (油汚れあり)", category: "burnable", mark: "燃" },
  { nameEn: "Leather shoes / sneaker", nameJa: "革靴・スニーカー", category: "burnable", mark: "燃" },
  { nameEn: "Rubber boots / gloves", nameJa: "ゴム手袋・長靴", category: "burnable", mark: "燃" },
  { nameEn: "Alkaline dry battery (AA/AAA)", nameJa: "アルカリ乾電池 (単1〜単4)", category: "hazardous", mark: "有害" },
  { nameEn: "Lithium mobile power bank", nameJa: "モバイルバッテリー (リチウム)", category: "hazardous", mark: "有害" },
  { nameEn: "Aerosol spray can (deodorant)", nameJa: "スプレー缶 (整髪料・殺虫剤)", category: "hazardous", mark: "有害" },
  { nameEn: "Cassette gas cylinder (butane)", nameJa: "カセットガスボンベ", category: "hazardous", mark: "有害" },
  { nameEn: "Ceramic plate / rice bowl", nameJa: "陶器の皿・茶碗", category: "nonburnable", mark: "不燃" },
  { nameEn: "Broken glass tumbler", nameJa: "割れたガラスコップ (キケン表記)", category: "nonburnable", mark: "不燃" },
  { nameEn: "Metal frying pan (under 30cm)", nameJa: "フライパン (30cm未満)", category: "nonburnable", mark: "不燃" },
  { nameEn: "Light bulb (incandescent/LED)", nameJa: "白熱電球・LED電球", category: "nonburnable", mark: "不燃" },
  { nameEn: "Fluorescent tube lamp (mercury)", nameJa: "蛍光灯管 (水銀含有・有害)", category: "hazardous", mark: "有害" },
  { nameEn: "Vinyl umbrella", nameJa: "ビニール傘", category: "nonburnable", mark: "不燃" },
  { nameEn: "Styrofoam food tray (white)", nameJa: "発泡スチロール白トレイ", category: "plastic", mark: "プラ" },
  { nameEn: "Snack chip bag (aluminum film)", nameJa: "ポテトチップスの袋 (アルミ蒸着プラ)", category: "plastic", mark: "プラ" },
  { nameEn: "Plastic bottle caps", nameJa: "ペットボトルキャップ (エコキャップ)", category: "plastic", mark: "プラ" },
  { nameEn: "Plastic shopping bag (conbini)", nameJa: "コンビニレジ袋", category: "plastic", mark: "プラ" },
  { nameEn: "Office chair / desk", nameJa: "オフィスチェア・机", category: "bulky", mark: "粗大" },
  { nameEn: "Bicycle / Mamachari", nameJa: "自転車・ママチャリ", category: "bulky", mark: "粗大" },
  { nameEn: "Futon mattress / duvet", nameJa: "布団・敷布団・毛布", category: "bulky", mark: "粗大" },
  { nameEn: "Suitcase / Luggage", nameJa: "スーツケース・キャリーバッグ", category: "bulky", mark: "粗大" },
  { nameEn: "Electric kettle / Toaster", nameJa: "電気ケトル・トースター (小型家電)", category: "nonburnable", mark: "不燃" },
  { nameEn: "Old clothes / T-shirts (clean)", nameJa: "古着・衣類 (リサイクル)", category: "paper", mark: "資源" },
  { nameEn: "Plastic shampoo pump bottle", nameJa: "シャンプー詰め替えボトル (プラ)", category: "plastic", mark: "プラ" }
];

export const MUNICIPAL_SCHEDULES = {
  shibuya: {
    nameEn: "Tokyo - Shibuya Ward (渋谷区)",
    nameJa: "東京都渋谷区",
    lat: 35.6618,
    lng: 139.7041,
    bagRuleEn: "Transparent or semi-transparent bag (max 45L). No mandatory paid bags for general household sorting.",
    bagRuleJa: "透明・半透明の45L以下の袋（渋谷区指定袋制度はありません）。",
    netRuleEn: "Must cover burnable trash bags with yellow crow protection nets before 8:00 AM.",
    netRuleJa: "カラス被害防止のため、朝8時までに黄色い防鳥ネットをしっかり被せてください。",
    schedule: {
      burnable: { daysEn: "Tuesday & Friday", daysJa: "火曜日・金曜日", time: "By 8:00 AM", nextDay: "Tuesday" },
      plastic: { daysEn: "Wednesday", daysJa: "水曜日", time: "By 8:00 AM", nextDay: "Wednesday" },
      pet: { daysEn: "1st & 3rd Thursday", daysJa: "第1・第3木曜日", time: "By 8:00 AM", nextDay: "Thursday" },
      cans: { daysEn: "2nd & 4th Thursday", daysJa: "第2・第4木曜日", time: "By 8:00 AM", nextDay: "Thursday" },
      glass: { daysEn: "2nd & 4th Thursday", daysJa: "第2・第4木曜日", time: "By 8:00 AM", nextDay: "Thursday" },
      paper: { daysEn: "Saturday", daysJa: "土曜日", time: "By 8:00 AM", nextDay: "Saturday" },
      nonburnable: { daysEn: "2nd & 4th Monday", daysJa: "第2・第4月曜日", time: "By 8:00 AM", nextDay: "Monday" },
      hazardous: { daysEn: "Drop-box at Ward Center", daysJa: "区役所・出張所回収ボックス", time: "During Open Hours", nextDay: "Daily" }
    }
  },
  shinjuku: {
    nameEn: "Tokyo - Shinjuku Ward (新宿区)",
    nameJa: "東京都新宿区",
    lat: 35.6938,
    lng: 139.7034,
    bagRuleEn: "Transparent or semi-transparent bags (up to 45L). Separate plastic packaging from burnables strictly.",
    bagRuleJa: "中身の見える透明・半透明袋を使用。資源プラと可燃の分別が厳格です。",
    netRuleEn: "Place out by 8:00 AM. Fasten garbage net edges tightly with weights.",
    netRuleJa: "朝8時までに排出。ネットの端におもりを乗せて隙間をなくしてください。",
    schedule: {
      burnable: { daysEn: "Monday & Thursday", daysJa: "月曜日・木曜日", time: "By 8:00 AM", nextDay: "Monday" },
      plastic: { daysEn: "Tuesday", daysJa: "火曜日", time: "By 8:00 AM", nextDay: "Tuesday" },
      pet: { daysEn: "Every Friday", daysJa: "毎週金曜日", time: "By 8:00 AM", nextDay: "Friday" },
      cans: { daysEn: "Every Friday", daysJa: "毎週金曜日", time: "By 8:00 AM", nextDay: "Friday" },
      glass: { daysEn: "Every Friday", daysJa: "毎週金曜日", time: "By 8:00 AM", nextDay: "Friday" },
      paper: { daysEn: "Wednesday", daysJa: "水曜日", time: "By 8:00 AM", nextDay: "Wednesday" },
      nonburnable: { daysEn: "1st & 3rd Tuesday", daysJa: "第1・第3火曜日", time: "By 8:00 AM", nextDay: "Tuesday" },
      hazardous: { daysEn: "Permanent drop box at Bic Camera / Donki", daysJa: "家電量販店・ドンキ回収BOX", time: "Store hours", nextDay: "Daily" }
    }
  },
  minato: {
    nameEn: "Tokyo - Minato Ward (港区)",
    nameJa: "東京都港区",
    lat: 35.6586,
    lng: 139.7514,
    bagRuleEn: "Semi-transparent bags. Many high-rise apartments provide 24/7 internal refuse rooms.",
    bagRuleJa: "半透明袋。タワーマンションでは24時間各階ダストステーション対応が多いです。",
    netRuleEn: "Curbside collection by 7:30 AM in residential quarters.",
    netRuleJa: "戸建て・小規模集合住宅は朝7:30までに出してください。",
    schedule: {
      burnable: { daysEn: "Tuesday & Friday", daysJa: "火曜日・金曜日", time: "By 7:30 AM", nextDay: "Tuesday" },
      plastic: { daysEn: "Thursday", daysJa: "木曜日", time: "By 7:30 AM", nextDay: "Thursday" },
      pet: { daysEn: "Wednesday", daysJa: "水曜日", time: "By 7:30 AM", nextDay: "Wednesday" },
      cans: { daysEn: "Wednesday", daysJa: "水曜日", time: "By 7:30 AM", nextDay: "Wednesday" },
      glass: { daysEn: "Wednesday", daysJa: "水曜日", time: "By 7:30 AM", nextDay: "Wednesday" },
      paper: { daysEn: "Monday", daysJa: "月曜日", time: "By 7:30 AM", nextDay: "Monday" },
      nonburnable: { daysEn: "2nd & 4th Saturday", daysJa: "第2・第4土曜日", time: "By 7:30 AM", nextDay: "Saturday" },
      hazardous: { daysEn: "Ward Office Drop Center", daysJa: "港区役所・各総合支所回収", time: "9:00 - 17:00", nextDay: "Daily" }
    }
  },
  osaka_kita: {
    nameEn: "Osaka City - Kita Ward (大阪市北区)",
    nameJa: "大阪市北区",
    lat: 34.7055,
    lng: 135.4983,
    bagRuleEn: "Transparent or white translucent bags. Bottles and cans can be bundled in one transparent bag.",
    bagRuleJa: "透明または半透明袋。びん・缶・ペットボトルは同日回収される場合があります。",
    netRuleEn: "Place out by 9:00 AM on collection morning.",
    netRuleJa: "収集日の朝9時までに出してください。",
    schedule: {
      burnable: { daysEn: "Monday & Thursday", daysJa: "月曜日・木曜日", time: "By 9:00 AM", nextDay: "Monday" },
      plastic: { daysEn: "Wednesday", daysJa: "水曜日", time: "By 9:00 AM", nextDay: "Wednesday" },
      pet: { daysEn: "Every Tuesday", daysJa: "毎週火曜日", time: "By 9:00 AM", nextDay: "Tuesday" },
      cans: { daysEn: "Every Tuesday", daysJa: "毎週火曜日", time: "By 9:00 AM", nextDay: "Tuesday" },
      glass: { daysEn: "Every Tuesday", daysJa: "毎週火曜日", time: "By 9:00 AM", nextDay: "Tuesday" },
      paper: { daysEn: "1st & 3rd Friday", daysJa: "第1・第3金曜日", time: "By 9:00 AM", nextDay: "Friday" },
      nonburnable: { daysEn: "2nd & 4th Thursday", daysJa: "第2・第4木曜日", time: "By 9:00 AM", nextDay: "Thursday" },
      hazardous: { daysEn: "Ward Eco Station Drop Box", daysJa: "環境事業センター回収", time: "Weekdays", nextDay: "Daily" }
    }
  },
  kyoto_nakagyo: {
    nameEn: "Kyoto City - Nakagyo Ward (京都市中京区)",
    nameJa: "京都市中京区",
    lat: 35.0116,
    lng: 135.7681,
    bagRuleEn: "MANDATORY designated yellow fee bags for Burnables, clear designated bags for Plastics.",
    bagRuleJa: "【有料指定袋必須】可燃ごみは黄色有料袋、資源プラは透明指定袋が必須です。",
    netRuleEn: "Must use designated yellow municipal bags purchased at convenience stores. Strict inspections!",
    netRuleJa: "市内のコンビニ・スーパーで京都市有料指定袋を購入して排出してください。",
    schedule: {
      burnable: { daysEn: "Tuesday & Friday", daysJa: "火曜日・金曜日", time: "By 8:00 AM", nextDay: "Tuesday" },
      plastic: { daysEn: "Thursday", daysJa: "木曜日", time: "By 8:00 AM", nextDay: "Thursday" },
      pet: { daysEn: "1st & 3rd Wednesday", daysJa: "第1・第3水曜日", time: "By 8:00 AM", nextDay: "Wednesday" },
      cans: { daysEn: "1st & 3rd Wednesday", daysJa: "第1・第3水曜日", time: "By 8:00 AM", nextDay: "Wednesday" },
      glass: { daysEn: "2nd & 4th Wednesday", daysJa: "第2・第4水曜日", time: "By 8:00 AM", nextDay: "Wednesday" },
      paper: { daysEn: "Monday", daysJa: "月曜日", time: "By 8:00 AM", nextDay: "Monday" },
      nonburnable: { daysEn: "Monthly 3rd Tuesday", daysJa: "毎月第3火曜日", time: "By 8:00 AM", nextDay: "Tuesday" },
      hazardous: { daysEn: "Ward Office Green Counter", daysJa: "中京区役所エコまちステーション", time: "9:00 - 17:00", nextDay: "Daily" }
    }
  }
};

export const NEARBY_DISPOSAL_POINTS = [
  {
    id: "combini-711-shibuya",
    nameEn: "7-Eleven Shibuya Dogenzaka",
    nameJa: "セブン-イレブン 渋谷道玄坂店",
    type: "combini",
    typeNameEn: "Convenience Store Recycling Point",
    typeNameJa: "コンビニ店頭回収ボックス",
    lat: 35.6595,
    lng: 139.6978,
    distanceKm: 0.25,
    openHoursEn: "Open 24 Hours",
    openHoursJa: "24時間営業",
    acceptedItemsEn: ["PET Bottles (Cap & Label separated)", "Aluminum & Steel Cans", "Clean Plastic Bottle Caps"],
    acceptedItemsJa: ["ペットボトル (キャップ・ラベル分離)", "アルミ缶・スチール缶", "エコキャップ"],
    addressEn: "2-16-8 Dogenzaka, Shibuya-ku, Tokyo",
    addressJa: "東京都渋谷区道玄坂2-16-8",
    rewardPoints: 20
  },
  {
    id: "super-life-shibuya",
    nameEn: "Life Supermarket Shibuya Higashi",
    nameJa: "ライフ 渋谷東店 (店頭リサイクル広場)",
    type: "supermarket",
    typeNameEn: "Supermarket Resource Center",
    typeNameJa: "スーパー店頭資源回収ステーション",
    lat: 35.6534,
    lng: 139.7112,
    distanceKm: 0.85,
    openHoursEn: "09:30 - 24:00 Daily",
    openHoursJa: "9:30〜24:00 (年中無休)",
    acceptedItemsEn: ["White Food Trays (washed)", "Milk Cartons (cut flat)", "Clear PET Bottles", "Aluminum Cans", "Egg Cartons"],
    acceptedItemsJa: ["白色発泡スチロールトレイ", "紙パック (開いて洗ったもの)", "ペットボトル", "アルミ缶", "透明卵パック"],
    addressEn: "1-26-21 Higashi, Shibuya-ku, Tokyo",
    addressJa: "東京都渋谷区東1-26-21",
    rewardPoints: 40
  },
  {
    id: "bic-camera-shibuya",
    nameEn: "Bic Camera Shibuya Hachiko Exit",
    nameJa: "ビックカメラ 渋谷東口店 (小型家電・電池回収)",
    type: "ewaste",
    typeNameEn: "E-Waste & Battery Hub",
    typeNameJa: "小型家電・有害電池回収ステーション",
    lat: 35.6599,
    lng: 139.7025,
    distanceKm: 0.35,
    openHoursEn: "10:00 - 21:00",
    openHoursJa: "10:00〜21:00",
    acceptedItemsEn: ["Rechargeable Lithium Batteries", "Alkaline Dry Cells", "Old Smartphones & Cables", "Small Electronics (<30cm)"],
    acceptedItemsJa: ["リチウムイオンモバイルバッテリー (JBRC黄BOX)", "乾電池", "使用済みスマートフォン・ケーブル", "小型家電"],
    addressEn: "1-24-12 Shibuya, Shibuya-ku, Tokyo",
    addressJa: "東京都渋谷区渋谷1-24-12",
    rewardPoints: 80
  },
  {
    id: "shibuya-sodai-center",
    nameEn: "Shibuya Ward Bulky Waste Reception Center",
    nameJa: "渋谷区 粗大ごみ受付・自己搬入センター",
    type: "bulky",
    typeNameEn: "Municipal Sodai Gomi Depot",
    typeNameJa: "粗大ごみ持ち込み・処理券受付センター",
    lat: 35.6644,
    lng: 139.6982,
    distanceKm: 1.20,
    openHoursEn: "Mon-Sat 08:30 - 17:00 (Advance Booking Required)",
    openHoursJa: "月〜土 8:30〜17:00 (要事前WEB・電話予約)",
    acceptedItemsEn: ["Furniture (>30cm)", "Bicycles", "Bedding & Mattresses", "Office Desks"],
    acceptedItemsJa: ["一辺30cm以上の家具", "自転車", "寝具・マットレス", "机・棚 (処理券貼付必須)"],
    addressEn: "1-1 Udagawacho, Shibuya-ku, Tokyo",
    addressJa: "東京都渋谷区宇田川町1-1",
    rewardPoints: 150
  },
  {
    id: "lawson-shinjuku",
    nameEn: "Lawson Shinjuku Station South",
    nameJa: "ローソン 新宿駅南口店 (PET・缶ボックス)",
    type: "combini",
    typeNameEn: "Convenience Store Recycling Point",
    typeNameJa: "コンビニ店頭回収ボックス",
    lat: 35.6888,
    lng: 139.7005,
    distanceKm: 0.40,
    openHoursEn: "Open 24 Hours",
    openHoursJa: "24時間営業",
    acceptedItemsEn: ["Crushed PET Bottles", "Drink Cans", "Plastic Bottle Caps"],
    acceptedItemsJa: ["ペットボトル", "缶", "ボトルキャップ"],
    addressEn: "4-1-6 Shinjuku, Shinjuku-ku, Tokyo",
    addressJa: "東京都新宿区新宿4-1-6",
    rewardPoints: 20
  },
  {
    id: "yodobashi-shinjuku",
    nameEn: "Yodobashi Camera Multimedia Shinjuku West",
    nameJa: "ヨドバシカメラ 新宿西口本店 (総合エコステーション)",
    type: "ewaste",
    typeNameEn: "E-Waste & Battery Hub",
    typeNameJa: "総合小型家電・廃電池リサイクル拠点",
    lat: 35.6908,
    lng: 139.6975,
    distanceKm: 0.50,
    openHoursEn: "09:30 - 22:00",
    openHoursJa: "9:30〜22:00",
    acceptedItemsEn: ["Mobile Batteries & Cells", "Ink Cartridges", "Fluorescent Tubes", "Laptops & Tablets"],
    acceptedItemsJa: ["リチウム電池", "純正インクカートリッジ", "直管・丸形蛍光灯", "パソコン・タブレット本体"],
    addressEn: "1-11-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo",
    addressJa: "東京都新宿区西新宿1-11-1",
    rewardPoints: 100
  }
];

export const GAMIFICATION_DATA = {
  initialPoints: 850,
  badges: [
    {
      id: "zero-waste-samurai",
      nameEn: "Zero-Waste Samurai",
      nameJa: "ごみゼロ侍",
      icon: "⚔️",
      unlocked: true,
      descriptionEn: "Mastered the 8 primary categories of Japanese Gomi sorting.",
      descriptionJa: "日本の8大ごみ分別ルールを完全制覇した証。"
    },
    {
      id: "pet-purifier",
      nameEn: "PET Purifier Master",
      nameJa: "ペットボトル三位一体名人",
      icon: "🧴",
      unlocked: true,
      descriptionEn: "Perfect 3-part split: rinsed bottle, detached cap, and peeled label 25 times.",
      descriptionJa: "ボトル・キャップ・ラベルの3点完全分別を25回達成！"
    },
    {
      id: "bento-master",
      nameEn: "Tokyo Bento Champion",
      nameJa: "コンビニ弁当エコ奉行",
      icon: "🍱",
      unlocked: true,
      descriptionEn: "Properly washed and separated 50 conbini bento containers.",
      descriptionJa: "油汚れを落として容器と割り箸を完璧に仕分けた達人。"
    },
    {
      id: "sakura-guardian",
      nameEn: "Sakura Forest Guardian",
      nameJa: "桜の守護神 (5000pts)",
      icon: "🌸",
      unlocked: false,
      descriptionEn: "Planted 5 virtual Sakura trees through verified recycling actions.",
      descriptionJa: "リサイクルポイントで桜の木を5本満開にした英雄。"
    },
    {
      id: "hazard-hero",
      nameEn: "Hazardous Materials Hero",
      nameJa: "危険物ゼロ防衛隊",
      icon: "🔋",
      unlocked: false,
      descriptionEn: "Safely returned 10 lithium batteries to electronics store drop-boxes.",
      descriptionJa: "リチウム電池やスプレー缶を安全に拠点回収へ持ち込んだ防衛隊長。"
    }
  ],
  leaderboard: [
    { rank: 1, wardEn: "Shibuya-ku Green Alliance", wardJa: "渋谷区 エコ同盟", points: 142850, users: 3420, avatar: "🗼" },
    { rank: 2, wardEn: "Shinjuku-ku Zero Waste", wardJa: "新宿区 クリーン隊", points: 138200, users: 3180, avatar: "🏙️" },
    { rank: 3, wardEn: "Minato-ku Eco Circle", wardJa: "港区 エコサークル", points: 129400, users: 2950, avatar: "🚢" },
    { rank: 4, wardEn: "Setagaya-ku Green Ward", wardJa: "世田谷区 みどりの会", points: 118700, users: 2710, avatar: "🌳" },
    { rank: 5, wardEn: "Kyoto Nakagyo Heritage Eco", wardJa: "京都市中京区 古都クリーン隊", points: 106300, users: 2430, avatar: "⛩️" }
  ],
  rewardsCatalog: [
    {
      id: "r1",
      titleEn: "7-Eleven Seven Cafe Coffee Voucher",
      titleJa: "セブンカフェ ホットコーヒー(R) 無料引換券",
      pointsCost: 350,
      icon: "☕",
      sponsor: "7-Eleven Japan",
      sponsorColor: "#008000"
    },
    {
      id: "r2",
      titleEn: "Free 10-Pack Tokyo 45L Municipal Trash Bags",
      titleJa: "東京都共通 45L半透明ごみ袋 (10枚入) 引換券",
      pointsCost: 500,
      icon: "🛍️",
      sponsor: "Tokyo Eco Bureau",
      sponsorColor: "#e63946"
    },
    {
      id: "r3",
      titleEn: "Lawson Machi Cafe 100-Yen Discount Coupon",
      titleJa: "ローソン マチカフェ 100円割引クーポン",
      pointsCost: 200,
      icon: "🏪",
      sponsor: "Lawson",
      sponsorColor: "#0066cc"
    },
    {
      id: "r4",
      titleEn: "Tokyo Metro Green Travel Points (+250)",
      titleJa: "東京メトロ To Me Card Ecoポイント (+250pt)",
      pointsCost: 800,
      icon: "🚇",
      sponsor: "Tokyo Metro",
      sponsorColor: "#00b4d8"
    }
  ]
};
