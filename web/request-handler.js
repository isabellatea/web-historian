var path = require('path');
var fs = require('fs');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!



var toDo = {
  'GET': function(req, res) {
  	var urlPathName = url.parse(req.url).pathname;
    console.log(urlPathName);
    // serve the initial html file that user sees -> index.html
    if (urlPathName ==='/') {
    	urlPathName = '/index.html';
    }

    //serves assets
    fs.readFile(archive.paths.siteAssets + urlPathName, 'utf-8', function(err, data) {
      if (err) { //file doesn't exist in public,
        fs.readFile(archive.paths.archivedSites + urlPathName, 'utf-8', function (err, data) { //then check if exists in archived/Sites folder
        	if (err) { //if file doesn't exist in archive site folder,
        	    archive.isUrlInList(urlPathName, function(listExists) { //check if Url is on the list
        	    	if(listExists) { //if it does exist on the list,
        	    		//console.log('[[[STUFF HERE...]]]');
                  //send response of 302 and redirect to /loading.html
                  res.statusCode = 302;
                  res.setHeader("Location", "/loading.html");
                  res.end();
        	    	} else { //doesn't exist in either archive sites folder or on list, sends 404
        	    		res.writeHead(404, helpers.headers);
        				  res.end('404: Not Found');
        	    	}
        	    })
        	} else { //exists in archived site folder, respond with 200 and page
        		//send response with (res, data);
        		res.writeHead(200, helpers.headers);
        		res.end(data);
        	}
        })
      } else { //exists in public folder, respond with 200 and page
        res.writeHead(200, helpers.headers);
        res.end(data);

      }
    });


//Might need for trimming leading slash:
  //     		if(urlPathName[0] === '/') {
		//     urlPathName = urlPathName.slice(1);
		// }

  },

  'POST':  function (req, res) {

    helpers.getAllData(req, function(input) { //gathers all data
      console.log(input)
    	var url = input.split('=')[1].replace('http://', ''); //replaces prefix with http://
      console.log('URL is ' + url)
	    archive.isUrlInList(input, function(urlExist) { //checks if Url is on list
	    	if(urlExist) { //if so,
	          archive.isUrlArchived(input, function(archivedExist) { //checks if it exists in archived sites folder
	          	if (archivedExist) { //if does,
	          		//console.log('[[STUFF HERE]]') // status code 302 and redirect to archived site page
                res.statusCode = 302;
                res.setHeader("Location", url);
                res.end();
	          	} else { //if exists in list but not in archived folder,
	          		console.log('[[STUFF HERE]]'); // status code 302 and send to loading.html
                res.statusCode = 302;
                res.setHeader("Location", "/loading.html");
                res.end();
	          	}
	          })
	    	} else { //if Url is NOT on list,
	    		archive.addUrlToList(input, function() { //adds to List
	          	console.log('[[STUFF HERE]]') //and responds with 302 and loading.html
              res.statusCode = 302;
              res.setHeader("Location", "/loading.html");
              res.end();
	    		})
	    	}
	    })

    })
}
}




    // var input = '';
    // req.on('data', function(chunk) {
    //   input += chunk;
    //   input = input.split('=')[1].replace('http://', '');
    // });
//     req.on('end', function() {
//       archive.isUrlInList(input,function(urlExist){
//         if (urlExist) {
//           archive.isUrlArchived(input, function(archivedExist) {
//             if (archivedExist) {
//               res.writeHead(200, headers);
//               var fileName = path.join(__dirname + '../archives/sites', input);
//               var fileStream = fs.createReadStream(fileName); // www.google.com
//               fileStream.pipe(res);
//               res.end();
//             }
//             else {
//               archive.addUrlToList(input, function() {
//                 // serve the loading.html
//                 fs.readFile(__dirname + '/public/loading.html', 'utf-8', function(err, data) {
//                   if (err) {
//                     res.writeHead(404);
//                     res.end();
//                   } else {
//                     res.writeHead(302, {'Content-Type' : 'text/html'});
//                     res.end(data);
//                   }
//                 });
//               });
//             }
//           });
//         }
//         // repeat else on line 46 - we need to refactor!
//       })
//       res.end();
//     })
//   }
// };



exports.handleRequest = function (req, res) {
  var handler = toDo[req.method];
  if (handler) {
    handler(req, res);
  } else {
    console.log('err')
  }
};



//   console.log(req.method, req.url);

//   if (req.method === 'GET') {
//     // serve the initial html file that user sees -> index.html
//     fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, data) { //make dynamic
//       if (err) {
//         res.writeHead(404);
//         res.end();
//       } else {
//         res.writeHead(200,{'Content-Type' : 'text/html'});
//         res.end(data);
//       }
//     })
//   } else if (req.method === 'POST') {
//     // grab url from request
//     var input = '';
//     req.on('data', function(chunk) {
//       input += chunk;


//     });

//     req.on('end', function() {
//       archive.isUrlArchived(input, function(exists) {
//         if (exists) {
//           res.writeHead(200, headers);
//           var fileName = path.join(__dirname + '../archives/sites', input);
//           var fileStream = fs.createReadStream(fileName); // www.google.com
//           fileStream.pipe(res);
//         }
//         else {
//           archive.addUrlToList(input);
//         }
//       });
//     });
//   }
// };

//if file is in directory, call http helper to return that asset back to client

