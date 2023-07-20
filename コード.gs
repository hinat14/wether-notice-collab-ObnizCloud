function getForecast() {
//Open Weather MapのAPIキーを定義する(各自APIキーで書き換え)
let apiKey = 'ef079fe3d9daacc789c83a4d1da62b94';
let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

//天気予報を取得する都市を定義する(今回は東京を設定)
let city = 'Sendai,JP';
let cnt = 10;
//APIリクエストするURLにAPIキーと取得都市のパラメータをセット
let requestUrl = apiUrl + city + cnt + '&appid=' + apiKey + '&lang=ja&units=metric';
//UrlFetchAppでOpen Weather MapのAPIから天気予報を取得する
let response = UrlFetchApp.fetch(requestUrl).getContentText();

//取得したデータはJSON形式のため、JSONとして変換する
let json = JSON.parse(response);
Logger.log(response);
//スプレッドシートに書き込むための配列を初期化する
let weatherInfo = [];

//主要7都市分のAPIリクエストをForループで実行する
for (let i = 0; i < json['list'].length; i++) {
weatherInfo[i] = [];
//Open Weather Mapから取得した天気予報の中から必要な情報を2次元配列に書き込み
weatherInfo[i][0] = json['list'][i]['dt_txt'];
weatherInfo[i][1] = json['list'][i]['weather'][0]['description'];
weatherInfo[i][2] = json['list'][i]['main']['temp_min'];
weatherInfo[i][3] = json['list'][i]['pop'];
}

//スクリプトに紐付いたスプレッドシートのアクティブなシートを読み込み
let mySheet = SpreadsheetApp.getActiveSheet();
//スプレッドシートにOpen Weather Mapから取得した天気予報を書き込み
mySheet.getRange(1,1).setValue(city);
mySheet.getRange(2, 1, weatherInfo.length, weatherInfo[0].length).setValues(weatherInfo);
}

function sendToSlack(value) {
    let url = "https://hooks.slack.com/services/T02S9DGQLN7/B05HWBPTVV0/OTK5YZJbPRsrgYmCZk6aa3z";
    let data = {
      text: "おい" + value
    };

    let dataJson = JSON.stringify(data);

    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      processData: false,
      data: "payload=" + dataJson
    }).then(
      function(data) {},
      function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("post to bot");
      }
    );
  }

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

  /*ここからなんかうまくいってない(Slackにメッセが飛ばない)*/
  if (value > value1){
    sendToSlack(value);
  }else{
    value = value1;
    sendToSlack(value);
  }
}

