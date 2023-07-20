function send_line() {
  const token = 'pK7WXToJJ9iGSJq1X0FTrrI6XWKgdFhK4sV0Dd4JcII';
  const lineNotifyApi = 'https://notify-api.line.me/api/notify';

  let message = '\nあ';

  const options =
   {
      "method"  : "post",
      "payload" : {"message": message},
      "headers" : {"Authorization":"Bearer " + token}
   };

   UrlFetchApp.fetch(lineNotifyApi, options);
  }