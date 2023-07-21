function getLastRowData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1'); 
  // シート名を適宜変更
  var lastRow = sheet.getLastRow();
  
  if (lastRow > 1) { 
    // データが1行以上ある場合のみ処理を実行
    var lastRowData = sheet.getRange(lastRow, 5, 1).getValues();
    return lastRowData;
  } else {
    return null; 
    // データがない場合はnullを返す
  }
}

function testGetLastRowData() {
  var data = getLastRowData();
  if (data == null) {
    Logger.log('No data found.');
  }
  var replace_sheet_num = data.toString().replace("[[]", "");
  var replace_sheet_num = replace_sheet_num.toString().replace(/$../, "");
  replace_sheet_num = parseFloat().replace_sheet_num
  Logger.log(replace_sheet_num);
  Logger.log(data);

  if(replace_sheet_num < 2000){
    getForecast();
    time_compare(now);
  }
}
