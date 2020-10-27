module.exports = {
  "/*/.env": ["1,2", "Tried to access environmental variable (/.env file)"],
  "/api/jsonws/invoke": ["15,19", "Tried to POST web API, /api/jsonws/invoke"],
  "/.git//index": ["15,19", "Attempted to access git files, /.git//index"],
  "/?a=fetch&content=<php>die(@md5(HelloThinkCMF))</php>": ["15,19", "ThinkPHP exploit. /?a=fetch&content=<php>die(@md5(HelloThinkCMF))</php>"],
  "/?XDEBUG_SESSION_START=phpstorm": ["15,19", "PHPSTORM Debug hack"],
  "/solr/admin/info/system?wt=json": ["15,19", "Trying to access solr admin page."],
  "/boaform/admin/formLogin": ["15,19", "Trying to access admin login: /boaform/admin/formLogin"],
  "/config/getuser?index=0": ["15,19", "Trying to access configuration files: /config/getuser?index=0"],
  "": ["15,19", ""],
  "": ["15,19", ""],
  "": ["15,19", ""]
};
