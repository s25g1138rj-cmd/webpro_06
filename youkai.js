"use strict";

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/* ===== データ ===== */
const youkaiList = [
  {
    id: 1,
    name: "ジバニャン",
    tribe: "プリチー族",
    description: "車にひかれて死んだネコの地縛霊．必殺技はパンチを素早く繰り出す「ひゃくれつ肉球」．ちょっとめんどくさがり屋さんで，気まぐれな性格だが頼りになる一面も！？アイドルユニット「ニャーKB」をこよなく愛している．口癖は，「オレっち，◯◯ニャン！」"
  },
  {
    id: 2,
    name: "ウィスパー",
    tribe: "ウスラカゲ族",
    description: "古いガシャガシャマシンの中から登場しケータにつきまとう自称・妖怪執事．見栄っ張りで知ったかぶりをするのでいつもケータに突っ込まれてしまう．愛嬌があり，憎めない妖怪．"
  },
  {
    id: 3,
    name: "コマさん",
    tribe: "プリチー族",
    description: "田舎にある神社のこま犬に取り憑いていたものの，その神社が取り壊された為に都会にやってきた妖怪．都会での生活に馴染もうと頑張っている．驚いたり，興奮すると「もんげー！！」と口にしてしまう．大好物はソフトクリーム．"
  },
  {
    id: 4,
    name: "USAピョン",
    tribe: "ウスラカゲ族",
    description: "もともとは，ウサギになりたくて，なれなかったフェレット系の小動物．宇宙工学の分野の第一人者であるヒューリー博士の目にとまり，引き取られていった．「はじめて宇宙にいく小動物」になるはずであったが，実験中の不慮の事故で亡くなり，妖怪となる．いつも強がって威張っているが，実は寂しがり屋．口グセは「ダニ（語尾）」"
  },
  {
    id: 5,
    name: "ノガッパ",
    tribe: "プリチー族",
    description: "水辺に住むカッパにも関わらず，歩くのが好きでよく散歩している．言葉の語尾に「〜ッス」と付ける喋り方も特徴的な妖怪．"
  },
  {
    id: 6,
    name: "グレるりん",
    tribe: "ゴーケツ族",
    description: "とにかくつっぱることを生きがいにしているワルな妖怪．取り憑くものは全て悪の世界に引きずりこむ，なんとも迷惑な妖怪である．"
  },
  {
    id: 7,
    name: "メラメライオン",
    tribe: "イサマシ族",
    description: "「メラメラ！」という言葉を使い，見た目では炎のたてがみを持つ百獣の王．この妖怪に取り憑かれるとメラメラと燃える心を注入されて，たちまち熱い奴になる．"
  },
  {
    id: 8,
    name: "ヒキコウモリ",
    tribe: "ウスラカゲ族",
    description: "この妖怪に取り憑かれると，外に出るのが嫌になり，家の中にひきこもってしまう．ずっと居場所がなかったが，ケータの家の押し入れに住むことになった．"
  },
  {
    id: 9,
    name: "ロボニャン",
    tribe: "ゴーケツ族",
    description: "ジバニャンの未来の姿で，実際に未来からやってきたロボットの妖怪．ロボットだけに，ジバニャンより知識量・戦闘能力，その全てが優れている頼れる妖怪．"
  },
  {
    id: 10,
    name: "ワカメくん・コンブさん・メカブちゃん",
    tribe: "ポカポカ族",
    description: "踊りという絆で結ばれている3妖怪．ダンスをこよなく愛しており，ノリノリな性格．この妖怪に取り憑かれると，陽気な気分になり，ところ構わず踊ってしまう．"
  },


];

// トップページ
app.get("/", (req, res) => {
  res.render("y_index");
});

// 妖怪一覧
app.get("/youkai", (req, res) => {
  res.render("y_list", {
    youkaiList
  });
});

// 妖怪詳細
app.get("/youkai/:id", (req, res) => {
  const id = Number(req.params.id);
  const youkai = youkaiList.find(y => y.id === id);

  if (!youkai) {
    return res.status(404).send("妖怪が見つかりません");
  }

  res.render("y_detail", {
    youkai
  });
});

/* ===== 追加 ===== */
app.post("/youkai/add", (req, res) => {
  const newId =
    youkaiList.length === 0
      ? 1
      : Math.max(...youkaiList.map(y => y.id)) + 1;

  youkaiList.push({
    id: newId,
    name: req.body.name,
    tribe: req.body.tribe,
    description: req.body.description
  });

  res.redirect("/youkai");
});


/* ===== 変更 ===== */
app.post("/youkai/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const youkai = youkaiList.find(y => y.id === id);

  if (!youkai) {
    return res.status(404).send("妖怪が見つかりません");
  }

  youkai.name = req.body.name;
  youkai.tribe = req.body.tribe;
  youkai.description = req.body.description;

  res.redirect(`/youkai/${id}`);
});


/* ===== 削除 ===== */
app.post("/youkai/:id/delete", (req, res) => {
  const id = Number(req.params.id);
  const index = youkaiList.findIndex(y => y.id === id);

  if (index === -1) {
    return res.status(404).send("妖怪が見つかりません");
  }

  youkaiList.splice(index, 1);
  res.redirect("/youkai");
});


app.listen(8080, () => {
  console.log("youkai-watch app started on http://localhost:8080");
});