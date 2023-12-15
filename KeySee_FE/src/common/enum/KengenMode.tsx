export enum KengenMode {
  Sansyou = 0,
  Koshin = 1 << 0,
  Syonin = 1 << 1,
  //Kakunin = &H1 << 2,

  //その他基本
  Delete = 1 << 3,
  //(追加事項あれば空いているビットに追加してください)

  //送り、差し戻し(Tab1→Tab2に移動するなど)
  Send = 1 << 6,
  Back = 1 << 7,
  //(追加事項あれば空いているビットに追加してください)

  //ビルメンテ計画読込
  MenteRead = 1 << 10,

  //出力(普段は1を使う、複数ある場合2以降を使う)
  Output1 = 1 << 13,
  Output2 = 1 << 14
}
