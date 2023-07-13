//LINEにデータを送信する関数
function sendMessage(){
  //A, LINE Notifyのトークンを登録
  const token = "NE6gj4U3GUFv2bNXVpbEgRRd449iz9pW3kR4OhVAQra";
  const lineNotifyApi = "https://notify-api.line.me/api/notify";
  const message = "\nメッセージを受信しました。";


  //B, LINEに送信する設定
  const options =
   {
     "method"  : "post", //POST送信
     "payload" : "message=" + message, //送信するメッセージ
     "headers" : {"Authorization" : "Bearer "+ token}
   };

   //C, FetchメソッドでLINEにメッセージを送信
   UrlFetchApp.fetch(lineNotifyApi, options);
}

/*
 *スプレッドシート＆シートオブジェクトを取得する関数 */
function getValue() {
  // スプレッドシート＆シートオブジェクトを取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('シート1');

  // A2セルを選択
  var range = sheet.getRange('B2');
  // セルの値を取得
  var value = range.getValue();

  // 取得したデータを実行ログに表示
  console.log(value);
}