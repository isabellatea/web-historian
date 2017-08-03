var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var url = require('url');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      console.log(err);
    }
    data = data.toString().split('\n'); //[url, url, url]
    if (callback) {
	    callback(data);
    }
  })
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data){ //gets a call backfunction
  	var exists = _.any(data, function(indivData) {
  		return indivData.match(url)
  	});
    callback(exists); //
  });
};

// isUrlInList("http://google", function(result){
//   console.log(result);
// })
// //true


exports.addUrlToList = function(url, callback) {
  var url = url.split('=')[1].replace('http://', '');
  fs.appendFile(exports.paths.list, url + '\n', function(err, data) {
    if (err) {
      console.log(err);
    }
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
//how do we check if the worker has already made the siteFile?
//read the files in 'archives-sites' and see if it "contains" our url
//if so, apply the callback to it.
var filePath = path.join(exports.paths.archivedSites, url);
fs.exists(filePath, function (exists) {
	callback(exists);
})


//we give it a URL
//asking it to check if the worker has made the site
//checking to see if this site exists in the site folder

//write all the ones we want to archive in sites.txt
//eventually the worker looks at that, and makes a siteFile in the site folder

};

exports.downloadUrls = function(urls) {
  //pull up the file name inside the archive folder
  //given the URL, fileName be the address
  _.each(urls, function(url){
    console.log(exports.paths.archivedSites + "/" + url);
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
  })

  /*var fileName = path.join(__dirname, '../archives/sites', url);
  console.log(fileName);
  //create an HTTP GET request and pipe its response into a writable file stream:
  request('http://' + url).pipe(fs.createWriteStream(fileName));
  console.log("THIS IS THE FILE NAME PATH:", fileName);
  // request(fil)*/
};

// webhistorian/archives/sites/sites.txt //file path to sites.txt
// webhistorian/archives/sites/www.example1.com //example1.com

