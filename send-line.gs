function send_line() {
  const token = 'pK7WXToJJ9iGSJq1X0FTrrI6XWKgdFhK4sV0Dd4JcII';
  const lineNotifyApi = 'https://notify-api.line.me/api/notify';

  let message = '\n感謝の言葉をかけるぐらいなら作業報酬くれぇぇぇ( ；∀；)\n通知時刻→' + now;

  const options =
   {
      "method"  : "post",
      "payload" : {"message": message},
      "headers" : {"Authorization":"Bearer " + token}
   };

   UrlFetchApp.fetch(lineNotifyApi, options);
  }