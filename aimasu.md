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

/unit1:ユニット1 --> /jinnmei:人名１

/jinnmei:人名１ -->  /id:番号（勝手につける）
/jinnmei:人名１ -->  /name:名前
/jinnmei:人名１ -->  /age:年齢
/jinnmei:人名１ -->  /attribute:属性
/jinnmei:人名１ -->  /age:年齢



```



entry --> /id:番号（勝手につける）
entry --> /name:名前
entry --> /attribute:属性
entry --> /overview:概要