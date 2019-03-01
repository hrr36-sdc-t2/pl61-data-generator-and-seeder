const fs = require('fs');
const request = require('request');

const download = function(uri, filename, callback){
  request.head(uri, () => {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

for (let i = 0; i < 100; i++) {
  download('https://loremflickr.com/600/450/city', `./img-gen/img/${i}.jpg`, () => {});
}
