function getForecast() {
//Open Weather MapのAPIキーを定義する(各自APIキーで書き換え)
let apiKey = 'ef079fe3d9daacc789c83a4d1da62b94';
let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

//天気予報を取得する都市を定義する
let city = 'Nishinomiya,JP';
let cnt = '10';
//APIリクエストするURLにAPIキーと取得都市のパラメータをセット
let requestUrl = apiUrl + city + cnt + '&appid=' + apiKey + '&lang=ja&units=metric';
//UrlFetchAppでOpen Weather MapのAPIから天気予報を取得する
let response = UrlFetchApp.fetch(requestUrl).getContentText();

//取得したデータはJSON形式のため、JSONとして変換する
let json = JSON.parse(response);
//スプレッドシートに書き込むための配列を初期化する
const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet(); 
const sheet = activeSpreadSheet.getSheetByName('テスト'); 
let weatherInfo = [];

//主要7都市分のAPIリクエストをForループで実行する
for (let i = 0; i < json['list'].length; i++) {
weatherInfo[i] = [];

//OWMのDateから日付のみを引き抜くやつ
var date = json['list'][i]['dt_txt'];
convert_date = date.substr( 0, 10 );

//OWMのDateから時間のみを引き抜くやつ
var time = json['list'][i]['dt_txt'];
convert_time = time.substr( 11 );

//Open Weather Mapから取得した天気予報の中から必要な情報を2次元配列に書き込み
weatherInfo[i][0] = convert_date;
weatherInfo[i][1] = convert_time;
weatherInfo[i][2] = json['list'][i]['pop'];
weatherInfo[i][3] = json['list'][i]['weather'][0]['description'];
}

//スクリプトに紐付いたスプレッドシートのアクティブなシートを読み込み
let mySheet = SpreadsheetApp.getActiveSheet();
//スプレッドシートにOpen Weather Mapから取得した天気予報を書き込み
mySheet.getRange(1,1).setValue(city);
mySheet.getRange(2, 1, weatherInfo.length, weatherInfo[0].length).setValues(weatherInfo);
}

function getCurrentTime() {
  var currentDate = new Date(); // 現在の日時を取得
  var hours = ("0" + currentDate.getHours()).slice(-2); // 時間を取得
  var minutes = ("0" + currentDate.getMinutes()).slice(-2); // 分を取得
  var seconds = ("0" + currentDate.getSeconds()).slice(-2); // 秒を取得

  var currentTime = hours + ":" + minutes + ":" + seconds;
  return currentTime;
}

var now = getCurrentTime();
//nowが今の時間ﾀﾞﾖ

/*時間表記のhh:mm:ssの:を抜くためにreplaceを使っています。
 *また各変数名は、シートから取得した時間の処理後をreplace_sheet_time、
 *現在時刻の処理後を、replace_timeとしています。
 *頑張って見返してね*/

function time_compare(now) {
  var cell_count = 0;
  var forbreak;

  //:抜き(現在時刻)
  var replace_time = now.replace(":", "");
  var replace_time = replace_time.replace(":", "");
  Logger.log(replace_time)

  // スプレッドシート＆シートオブジェクトを取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = activeSpreadSheet.getSheetByName('wether');

  while(forbreak != 123) {
    var sheetvalue = (function getValue() 
      {
        // セルを選択
        var range = sheet.getRange('B', cell_count);
        // セルの値を取得
        var value = range.getValue();

        return value.toString();
      })();

      cell_count = cell_count + 1;

      //:抜き(シート時刻)
      var replace_sheet_time = sheetvalue.replace(":", "");
      var replace_sheet_time = replace_sheet_time.replace(":", "");

      Logger.log(replace_sheet_time)
      if (replace_time > replace_sheet_time){
      var range = sheet.getRange(C, cell_count);
      var pop = range.getValue();
      forbreak = 123;
    }
  }

  //pop取得用getValue
  var sheetvalue = (function getValue() 
  {
    // セルを選択
    var range = sheet.getRange('C', cell_count);
    // セルの値を取得
    var value = range.getValue();

    return value;
  })();

  Logger.log(pop);
  if(pop > 0.3){
    send_line();
  }
}