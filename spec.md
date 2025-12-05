# 開発者仕様書（仮）
## 概要
## HTTPメソッドとリソース名一覧
## データ構造
## ページ遷移
どうやってページ遷移するか？（ページ内のリンク，クリックする場所など）
HTTPメソッドとリソース名
追加・削除・編集後に表示する内容

## リソース名ごとの機能の詳細

## mermaid
kononakakarahitotuerabu
### aimasu_kari

```mermaid
stateDiagram-v2
[*] --> entry:ランディングページ
entry : /
entry --> /aimasu:アイドルマスター
entry --> /deresute:アイドルマスターシンデレラガールズ
entry --> /mirirai:アイドルマスターミリオンライブ
entry --> /syanimasu:アイドルマスターシャイニーカラーズ
entry --> /gakumasu:学園アイドルマスター

/aimasu --> /unit1:ユニット1
/aimasu --> /unit2:ユニット2
/aimasu --> /unit3:ユニット3

/unit1 : ユニット1  
/jinnmei : 人名１    
/unit1 --> /jinnmei   

/jinnmei --> /id:番号（勝手につける）
/jinnmei --> /name:名前
/jinnmei --> /age:年齢
/jinnmei --> /attribute:属性

```


### youkai_kari
```mermaid
stateDiagram-v2
[*] --> entry:ランディングページ
entry : /
entry --> /id:番号（勝手につける）
entry --> /name:名前
entry --> /attribute:属性
entry --> /overview:概要
```