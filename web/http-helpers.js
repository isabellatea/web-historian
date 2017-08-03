var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

// var that = this;

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

//   // Write some code here that helps serve up your static files!
//   // (Static files are things like html (yours or archived from others...),
//   // css, or anything that doesn't change often.)
exports.serveAssets = function(res, asset, callback) {

//called if the file IS in our archive
//take that file (asset), and it response to the request with that asset


}



exports.getAllData = function(req, callback) {
	var input = '';
	req.on('data', function(chunk) {
		input += chunk;
	})
	req.on('end', function() {
		callback(input);
	})
}





























//   // Write some code here that helps serve up your static files!
//   // (Static files are things like html (yours or archived from others...),
//   // css, or anything that doesn't change often.)

//   //read the file
//   fs.readFile(archive.paths.siteAssests + asset, 'utf8', function(err, data) {
//     if (err) {
//       console.log(err);
//     }
//     // get status code
//     that.sendingResponse(res,data,200,contentType);
//   })
//   //send it off
// };

// exports.sendingResponse = function(res, data, statusCode, contentType) {
//   if (contentType) {
//     headers['Content-Type'] = contentType;
//   }
//   res.writeHead(statusCode,that.headers);
//   res.end(data);
// }




// As you progress, keep thinking about what helper functions you can put here!
