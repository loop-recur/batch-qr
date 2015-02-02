var vCard = require('vcards-js'),
  parse = require('csv-parse'),
  fs = require('fs'),
  v = require('vcards-js'),
  qr = require('qrpng');

fs.readFile('names.csv', 'utf8', function (err,data) {
  parse(data, {}, function (err, people) {
    people.map(function (p) {
      var card = v();
      card.firstName = p[0];
      card.lastName = p[1];
      card.email = p[2];

      console.log(p);

      qr(card.getFormattedString(), function (err, png) {
        var pic = fs.createWriteStream(card.lastName + '-' + card.firstName + ".png");
        pic.write(png);
        pic.end();
      });
    });
  });
});
