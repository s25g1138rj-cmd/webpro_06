"use strict";
const express = require("express");
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let youkaisyoukai = [
  { id:1, name:"ジバニャン", attribute:"プリチー", specialmove:"百裂肉球" , overview:"トラックの動きを一瞬止める"},
  { id:2, name:"ジバニャン", attribute:"プリチー", specialmove:"百裂肉球" , overview:"トラックの動きを一瞬止める"},

];

app.get("/youkai", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('youkai', {data: youkaisyoukai} );
});



