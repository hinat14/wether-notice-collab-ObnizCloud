function getValue() {
  // スプレッドシート＆シートオブジェクトを取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('シート1');

  // A2セルを選択
  var range = sheet.getRange('A2');
  // セルの値を取得
  var value = range.getValue();

  // A3セルを選択
  var range = sheet.getRange('A3');
  // セルの値を取得
  var value1 = range.getValue();

  // 取得したデータを実行ログに表示
  console.log(value);

  if (value > value1){
  Logger.log(value);
}else{
  Logger.log(value1);
}
}
