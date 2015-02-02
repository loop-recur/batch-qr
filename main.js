var vCard = require('vcards-js'),
  parse = require('csv-parse'),
  fs = require('fs'),
  v = require('vcards-js'),
  qr = require('qrpng'),
  R = require('ramda');

fs.readFile('names.csv', 'utf8', function (err,data) {
  parse(data, {}, function (err, people) {
    R.forEachIndexed(function (p, i) {
      var card = v();
      card.firstName = p[0];
      card.lastName = p[1];
      card.email = p[2];

      console.log(p);

      qr(card.getFormattedString(), function (err, png) {
        var pic = fs.createWriteStream((i+1) + ".png");
        pic.write(png);
        pic.end();
      });
    }, people);
  });
});
