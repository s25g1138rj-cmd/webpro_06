"use strict";

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/* ===== データ ===== */
const groups = {
  liella: {
    name: "Liella!",
    units: {
      catchu: {
        name: "CatChu!",
        members: [
          {
            id: 0,
            name: "米女メイ",
            profile: {
              birthday: "10/29",
              blood: "A",
              height: "155cm",
              hobby: "子猫グッズ集め",
              skill: "かけっこ",
              food: "ブルーベリー",
              word: "一生懸命",
              subject: "体育",
              animal: "猫"
            }
          },
          {
            id: 1,
            name: "澁谷かのん",
            profile: {
              birthday: "5/1",
              blood: "A",
              height: "159cm",
              hobby: "ふくろうグッズ集め",
              skill: "ラテアート",
              food: "焼きリンゴ",
              word: "雲の上はいつも晴れ",
              subject: "音楽",
              animal: "ふくろう"
            }
          },
          {
            id: 2,
            name: "平安名すみれ",
            profile: {
              birthday: "9/28",
              blood: "AB",
              height: "161cm",
              hobby: "読書",
              skill: "自撮り",
              food: "卵かけご飯",
              word: "一念天に通ず",
              subject: "国語",
              animal: "クジャク"
            }
          }
        ]
      },

      kaleidoscore: {
        name: "KALEIDOSCORE",
        members: [
          {
            id: 0,
            name: "唐可可",
            profile: {
              birthday: "7/17",
              blood: "O",
              height: "159cm",
              hobby: "コスプレ",
              skill: "古着のリメイク",
              food: "ナポリタン",
              word: "思い立ったが吉日",
              subject: "体育以外なんでも",
              animal: "猫"
            }
          },
          {
            id: 1,
            name: "マルガレーテ",
            profile: {
              birthday: "1/20",
              blood: "A",
              height: "161cm",
              hobby: "お菓子作り",
              skill: "歌",
              food: "チョコレート",
              word: "初志貫徹",
              subject: "外国語",
              animal: "狼"
            }
          },
          {
            id: 2,
            name: "葉月恋",
            profile: {
              birthday: "11/24",
              blood: "A",
              height: "163cm",
              hobby: "乗馬",
              skill: "ピアノ",
              food: "コンソメスープ",
              word: "初心忘れべからず",
              subject: "生物",
              animal: "犬"
            }
          }
        ]
      },

      syncrise: {
        name: "5yncri5e!",
        members: [
          {
            id: 0,
            name: "若菜四季",
            profile: {
              birthday: "6/17",
              blood: "B",
              height: "161cm",
              hobby: "実験",
              skill: "暗算",
              food: "栗",
              word: "沈黙は金",
              subject: "化学",
              animal: "蝶々"
            }
          },
          {
            id: 1,
            name: "鬼塚夏美",
            profile: {
              birthday: "8/7",
              blood: "AB",
              height: "152cm",
              hobby: "スムージー開発",
              skill: "写真",
              food: "納豆",
              word: "嘘も方便",
              subject: "現代文",
              animal: "ゾウ"
            }
          },
          {
            id: 2,
            name: "桜小路きなこ",
            profile: {
              birthday: "4/10",
              blood: "O",
              height: "159cm",
              hobby: "家庭菜園",
              skill: "動物と話せる",
              food: "じゃがいも",
              word: "七転び八起き",
              subject: "生物",
              animal: "キタキツネ"
            }
          },
          {
            id: 4,
            name: "嵐千砂都",
            profile: {
              birthday: "2/25",
              blood: "B",
              height: "155cm",
              hobby: "体を動かすこと",
              skill: "初対面の子と仲よくなること",
              food: "たこ焼き",
              word: "早起きは三文の徳",
              subject: "体育",
              animal: "ハムスター"
            }
          },
          {
            id: 5,
            name: "鬼塚冬毬",
            profile: {
              birthday: "12/28",
              blood: "B",
              height: "163cm",
              hobby: "パズルゲーム",
              skill: "整理整頓",
              food: "焼き芋",
              word: "夢でお腹は膨れない",
              subject: "地理",
              animal: "クラゲ"
            }
          },
        ]
      }
    }
  }
};



/* ===== トップ（グループ選択） ===== */
app.get("/", (req, res) => {
  res.render("ll_index");
});

/* ===== ユニット選択 ===== */
app.get("/:group", (req, res) => {
  const group = groups[req.params.group];
  if (!group) return res.send("グループが見つかりません");

  res.render("ll_unit", {
    groupKey: req.params.group,
    group
  });
});

/* ===== キャラクター一覧 ===== */
app.get("/:group/:unit", (req, res) => {
  const { group, unit } = req.params;
  const unitData = groups[group]?.units[unit];
  if (!unitData) return res.send("ユニットが見つかりません");

  res.render("ll_list", {
    group,
    unit,
    unitData
  });
});

/* ===== プロフィール ===== */
app.get("/:group/:unit/:id", (req, res) => {
  const { group, unit, id } = req.params;
  const member = groups[group]?.units[unit]?.members[id];
  if (!member) return res.send("キャラクターが見つかりません");

  res.render("ll_profile", {
    group,
    unit,
    member
  });
});


/* ===== 追加 ===== */
app.post("/:group/:unit/add", (req, res) => {
  const { group, unit } = req.params;
  const members = groups[group].units[unit].members;

  const newMember = {
    id: members.length,
    name: req.body.name,
    profile: {
      birthday: req.body.birthday,
      blood: req.body.blood,
      height: req.body.height,
      hobby: req.body.hobby,
      skill: req.body.skill,
      food: req.body.food,
      word: req.body.word,
      subject: req.body.subject,
      animal: req.body.animal
    }
  };

  members.push(newMember);
  res.redirect(`/${group}/${unit}`);
});


/* ===== 削除 ===== */
app.post("/:group/:unit/:id/delete", (req, res) => {
  const { group, unit, id } = req.params;
  const members = groups[group].units[unit].members;

  members.splice(id, 1);

  // id を振り直す
  members.forEach((m, i) => (m.id = i));

  res.redirect(`/${group}/${unit}`);
});


/* ===== 変更 ===== */
app.post("/:group/:unit/:id/edit", (req, res) => {
  const { group, unit, id } = req.params;
  const member = groups[group].units[unit].members[id];

  member.name = req.body.name;
  member.profile = {
    birthday: req.body.birthday,
    blood: req.body.blood,
    height: req.body.height,
    hobby: req.body.hobby,
    skill: req.body.skill,
    food: req.body.food,
    word: req.body.word,
    subject: req.body.subject,
    animal: req.body.animal
  };

  res.redirect(`/${group}/${unit}/${id}`);
});





app.listen(8080, () => {
  console.log("LoveLive app started on http://localhost:8080");
});
