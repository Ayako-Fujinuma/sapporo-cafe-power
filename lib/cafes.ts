export type PowerLevel = "full" | "partial" | "counter";
export type Category = "cafe" | "coworking";

export type Cafe = {
  id: string;
  name: string;
  area: string;
  nearestStation: string;
  address?: string;
  power: string;
  powerLevel: PowerLevel;
  wifi: string;
  hours: string;
  seats?: number;
  tags: string[];
  note: string;
  category: Category;
};

export const POWER_LEVEL_LABEL: Record<PowerLevel, string> = {
  full: "全席に電源あり",
  partial: "一部の席に電源あり",
  counter: "カウンター席のみ電源あり",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  cafe: "カフェ",
  coworking: "コワーキングスペース",
};

// スプレッドシートに接続できなかった場合に表示するフォールバックデータ。
export const FALLBACK_CAFES: Cafe[] = [
  {
    id: "cafe-de-crie-kitaguchi",
    name: "Cafe de Crie 札幌駅北口店",
    area: "札幌駅",
    nearestStation: "札幌駅北口 徒歩すぐ",
    power: "全席に電源・USB充電あり",
    powerLevel: "full",
    wifi: "無料Wi-Fiあり(登録不要)",
    hours: "8:00〜20:00",
    tags: ["全席電源", "USB充電", "作業向き"],
    note: "個別プラグとUSB充電が各席にあり、長時間の作業にも向いていると評判。",
    category: "cafe",
  },
  {
    id: "poool-espresso-work",
    name: "poool -Espresso&Work- Sapporo",
    area: "札幌駅",
    nearestStation: "さっぽろ駅 徒歩3分",
    address: "中央区北2条西3丁目",
    power: "座席により電源あり",
    powerLevel: "partial",
    wifi: "Wi-Fiあり",
    hours: "9:00〜22:00",
    seats: 70,
    tags: ["書店併設", "全席禁煙", "座席広め"],
    note: "書店併設のブックカフェ。ワーキングカウンター・テーブル・ソファ席など座席の種類が豊富。",
    category: "cafe",
  },
  {
    id: "neighbour-roast-brew",
    name: "NEIGHBOUR Roast&Brew",
    area: "札幌駅",
    nearestStation: "さっぽろ駅 徒歩2分",
    power: "カウンター席に電源あり",
    powerLevel: "counter",
    wifi: "Wi-Fiあり",
    hours: "9:00〜23:00",
    tags: ["ホテル併設", "静か", "クラフトビール"],
    note: "ホテル併設で落ち着いた雰囲気。クラフトビール醸造所併設で、夜まで長居しやすい。",
    category: "cafe",
  },
  {
    id: "bonsalute-cafe",
    name: "ボンサルーテ・カフェ",
    area: "札幌駅",
    nearestStation: "札幌駅 徒歩4分",
    power: "駅側の窓沿いカウンター席に電源あり",
    powerLevel: "counter",
    wifi: "Wi-Fiあり",
    hours: "モーニング〜昼過ぎ営業(時間帯は要確認)",
    seats: 91,
    tags: ["ホテル内", "見晴らし良好"],
    note: "ホテルグレイスリー内。営業時間が限定的なので訪問前に公式サイトでの確認がおすすめ。",
    category: "cafe",
  },
  {
    id: "benkyo-cafe-odori",
    name: "勉強カフェ札幌大通スタジオ",
    area: "大通",
    nearestStation: "大通駅 直結",
    power: "各席に電源あり",
    powerLevel: "full",
    wifi: "Wi-Fiあり",
    hours: "会員制(利用時間は要問い合わせ)",
    tags: ["会員制", "長時間OK", "コワーキング"],
    note: "会員制のコワーキング系スペース。仕切りのあるワークスペースやフリードリンクがあり、長時間の作業に特化。",
    category: "coworking",
  },
  {
    id: "canvas-lounge-kokage",
    name: "CANVAS LOUNGE「KOKAGE」",
    area: "大通",
    nearestStation: "大通公園 徒歩すぐ",
    power: "カウンター席に電源あり",
    powerLevel: "counter",
    wifi: "Wi-Fiあり",
    hours: "10:00〜23:00",
    tags: ["公園ビュー", "おしゃれ"],
    note: "大通公園ビューでおしゃれな雰囲気。落ち着いて作業したい人向け。",
    category: "cafe",
  },
  {
    id: "todai-coffee",
    name: "灯台珈琲",
    area: "大通",
    nearestStation: "大通駅 徒歩2分",
    address: "中央区南2条西5丁目",
    power: "電源あり",
    powerLevel: "partial",
    wifi: "Wi-Fiあり",
    hours: "9:30〜18:00頃(情報源により22:00までとの記載もあり要確認)",
    seats: 37,
    tags: ["本が読める", "広々"],
    note: "37席と広々としたカフェスペースで、置いてある本を自由に読める貸し本コーナーあり。",
    category: "cafe",
  },
  {
    id: "tullys-stellar-place",
    name: "タリーズコーヒー ステラプレイス店",
    area: "札幌駅",
    nearestStation: "札幌駅 直結",
    power: "充電スポットあり",
    powerLevel: "partial",
    wifi: "Wi-Fiあり",
    hours: "10:00〜22:00",
    seats: 70,
    tags: ["駅直結", "アクセス良好"],
    note: "駅直結で天候を気にせずアクセスできるのが魅力。70席と広め。",
    category: "cafe",
  },
  {
    id: "cafe-croissant-apia",
    name: "カフェクロワッサン札幌アピア店",
    area: "札幌駅",
    nearestStation: "さっぽろ駅 徒歩1分",
    power: "電源あり",
    powerLevel: "partial",
    wifi: "Wi-Fiあり",
    hours: "7:30〜22:00",
    seats: 108,
    tags: ["朝から営業", "焼きたてパン"],
    note: "焼きたてのパンとサンドイッチが人気。108席あり朝から夜まで使いやすい。",
    category: "cafe",
  },
  {
    id: "komeda-tanukikoji2",
    name: "コメダ珈琲 狸小路2丁目店",
    area: "すすきの",
    nearestStation: "大通駅 徒歩3分",
    power: "電源あり",
    powerLevel: "partial",
    wifi: "Wi-Fiあり",
    hours: "7:30〜23:00",
    seats: 84,
    tags: ["モーニングあり", "分煙"],
    note: "モーニングサービスあり、分煙で作業しやすい。すすきの・大通エリアで長居しやすい定番店。",
    category: "cafe",
  },
  {
    id: "hotel-potmum",
    name: "HOTEL POTMUM stay&coffee",
    area: "菊水",
    nearestStation: "地下鉄東西線 菊水駅 徒歩3分",
    address: "白石区菊水1条1丁目",
    power: "電源あり",
    powerLevel: "partial",
    wifi: "Wi-Fiあり",
    hours: "7:30〜20:00頃(情報源により21:00までとの記載もあり要確認)",
    tags: ["天井高5m", "蔵書1000冊以上"],
    note: "天井高5メートルを超える開放的な空間と1,000冊以上の蔵書が魅力。ホテル1階のカフェスペース。",
    category: "cafe",
  },
  {
    id: "morihiko-stay-coffee",
    name: "MORIHIKO. Stay & Coffee",
    area: "菊水",
    nearestStation: "菊水駅 徒歩3分",
    power: "電源あり",
    powerLevel: "partial",
    wifi: "Wi-Fiあり",
    hours: "7:30〜21:00",
    seats: 50,
    tags: ["自家焙煎", "地元食材"],
    note: "自社焙煎コーヒーと地元食材を使った料理が楽しめる。50席以上と余裕のある空間。",
    category: "cafe",
  },
];
