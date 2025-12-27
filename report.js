"use strict";

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

//===== データ ===== 
const systems = {
  aimasu: {
    name: "アイドルマスター",
    idols: [
      {id: 0,name: "星井 美希",profile: {age: 15, blood: "B", birthday: "11/23",
          zodiac: "いて座", height: 161, weight: 45,
          size: "86/55/83", birthplace: "神奈川県", hobby: "友達とおしゃべり、ネイルアート"}},
      { id: 1, name: "四条 貴音", profile: { age: 18, blood: "B", birthday: "1/21",
          zodiac: "みずがめ座", height: 169, weight: 49,
          size: "90/62/92", birthplace: "京都府?", hobby: "天体観測，歴史" } },
      { id: 2, name: "菊地 真", profile: { age: 17, blood: "O", birthday: "8/29",
          zodiac: "おとめ座", height: 159, weight: 44,
          size: "75/57/78", birthplace: "静岡県", hobby: "スポーツ全般"} }
    ]
  },

  deresute: {
    name: "シンデレラガールズ",
    idols: [
      { id: 0, name: "神崎 蘭子", profile: { age: 14, blood: "A", birthday: "4/8",
          zodiac: "おひつじ座", height: 156, weight: 41,
          size: "81/57/80", birthplace: "熊本県", hobby: "絵を描くこと" } },
      { id: 1, name: "前川 みく", profile: { age: 15, blood: "B", birthday: "2/22",
          zodiac: "うお座", height: 152, weight: 45,
          size: "85/55/81", birthplace: "大阪府", hobby: "猫カフェ巡り" } },
      { id: 2, name: "双葉 杏", profile: { age: 17, blood: "B", birthday: "9/2",
          zodiac: "花も恥らう乙女座", height: 139, weight: 30,
          size: "不明", birthplace: "北海道", hobby: "なし" } }
    ]
  },

  mirirai: {
    name: "ミリオンライブ",
    idols: [
      { id: 0, name: "ジュリア", profile: { age: 16, blood: "O", birthday: "9/26",
          zodiac: "てんびん座", height: 157, weight: 43,
          size: "79/54/80", birthplace: "福岡県", hobby: "なし" } },
      { id: 1, name: "伊吹 翼", profile: { age: 14, blood: "B", birthday: "7/30",
          zodiac: "しし座", height: 158, weight: 43,
          size: "85/52/82", birthplace: "東京都", hobby: "遊びの計画をたてること" } },
      { id: 2, name: "永吉 昴", profile: { age: 15, blood: "B", birthday: "9/20",
          zodiac: "おとめ座", height: 154, weight: 41,
          size: "79/59/78", birthplace: "東京都", hobby: "野球" } }
    ]
  },

  syanimasu: {
    name: "シャイニーカラーズ",
    idols: [
      { id: 0, name: "西城 樹里", profile: { age: 17, blood: "O", birthday: "11/26",
          zodiac: "いて座", height: 160, weight: 48,
          size: "75/58/78", birthplace: "神奈川県", hobby: "洋楽，ゲーム"} },
      { id: 1, name: "大崎 甘奈", profile: { age: 17, blood: "A", birthday: "12/25",
          zodiac: "やぎ座", height: 159, weight: 43,
          size: "80/56/80", birthplace: "富山県", hobby: "ショッピング，ネイル，自撮り" } },
      { id: 2, name: "浅倉 透", profile: { age: 17, blood: "B", birthday: "5/4",
          zodiac: "おうし座", height: 160, weight: 50,
          size: "82/57/78", birthplace: "東京都", hobby: "映画鑑賞" } }
    ]
  },

  gakumasu: {
    name: "学園アイドルマスター",
    idols: [
      { id: 0, name: "紫雲 清夏", profile: { age: 15, blood: "O", birthday: "11/11",
          zodiac: "さそり座", height: 168, weight: 54,
          size: "89/58/85", birthplace: "北海道", hobby: "カラオケ，SNS" } },
      { id: 1, name: "倉本 千奈", profile: { age: 15, blood: "O", birthday: "8/1",
          zodiac: "しし座", height: 148, weight: 43,
          size: "73/56/73", birthplace: "神奈川県", hobby: "お絵描き" } },
      { id: 2, name: "十王 星南", profile: { age: 17, blood: "A", birthday: "12/7",
          zodiac: "いて座", height: 170, weight: 54,
          size: "88/56/86", birthplace: "東京都", hobby: "レッスン、才能のあるアイドルを見つけること" } }
    ]
  }
};

// ===== トップページ（ブランド選択） ===== 
app.get("/", (req, res) => {
  res.render("index");
});


// ===== プロフィール ===== 
app.get("/:brand/:id/profile", (req, res) => {
  const brand = req.params.brand;
  const id = Number(req.params.id);
  const system = systems[brand];

  if (!system) {
    return res.send("シリーズが見つかりません");
  }

  const idol = system.idols.find(i => i.id === id);

  if (!idol) {
    return res.send("アイドルが見つかりません");
  }

  res.render("profile", {
    brand,
    id,
    idol
  });
});






// ===== 詳細 ===== 
app.get("/:brand/:id", (req, res) => {
  const brand = req.params.brand;
  const id = Number(req.params.id);
  const system = systems[brand];

  if (!system) {
    return res.send("シリーズが見つかりません");
  }

  const idol = system.idols.find(i => i.id === id);

  if (!idol) {
    return res.send("アイドルが見つかりません");
  }

  res.render("detail", {
    brand,
    id,
    idol
  });
});


// ===== 一覧 =====
app.get("/:brand", (req, res) => {
  const brand = req.params.brand;
  const system = systems[brand];

  if (!system) {
    return res.status(404).send("存在しないシリーズです");
  }

  res.render("list", {
    system,
    brand
  });
});


/* ===== 追加 ===== */
app.post("/:brand/add", (req, res) => {
  const brand = req.params.brand;
  const system = systems[brand];

  if (!system) {
    return res.status(404).send("存在しないシリーズです");
  }

  const newId =
    system.idols.length > 0
      ? Math.max(...system.idols.map(i => i.id)) + 1
      : 0;

  system.idols.push({
    id: newId,
    name: req.body.name,
    profile: {
      age: req.body.age,
      blood: req.body.blood,
      birthday: req.body.birthday,
      zodiac: req.body.zodiac,
      height: req.body.height,
      weight: req.body.weight,
      size: req.body.size,
      birthplace: req.body.birthplace,
      hobby: req.body.hobby,
    }
  });

  res.redirect(`/${brand}`);
});


/* ===== 編集 ===== */
app.post("/:brand/:id/update", (req, res) => {
  const brand = req.params.brand;
  const id = Number(req.params.id);
  const system = systems[brand];

  if (!system) {
    return res.status(404).send("存在しないシリーズです");
  }

  const idol = system.idols.find(i => i.id === id);

  if (!idol) {
    return res.status(404).send("アイドルが見つかりません");
  }

  idol.name = req.body.name;
  idol.profile = {
    age: req.body.age,
    blood: req.body.blood,
    birthday: req.body.birthday,
    zodiac: req.body.zodiac,
    height: req.body.height,
    weight: req.body.weight,
    size: req.body.size,
    birthplace: req.body.birthplace,
    hobby: req.body.hobby
  };

  res.redirect(`/${brand}/${id}`);
});


/* ===== 削除 ===== */
app.post("/:brand/:id/delete", (req, res) => {
  const brand = req.params.brand;
  const id = Number(req.params.id);
  const system = systems[brand];

  if (!system) {
    return res.status(404).send("存在しないシリーズです");
  }

  const index = system.idols.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).send("アイドルが見つかりません");
  }

  system.idols.splice(index, 1);

  res.redirect(`/${brand}`);
});


app.listen(8080, () => console.log("aidorumasuta- started on port 8080"));
