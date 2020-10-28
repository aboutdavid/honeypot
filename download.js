// Run 'node download.js' to update the honeypot trap list:
var url = ""
const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream("file.jpg");
const request = http.get(url, function(response) {
  response.pipe(file);
});