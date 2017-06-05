/*
 * Static Mapping Module
 * 
 * Takes assests' logical path and returns their full path.
 * Currently baseUrl is empty since the static content are stored locally
 * Change the baseUrl to your CDN path is static content are deployed
 */
var baseUrl = '';

exports.map = function(name){
	return baseUrl + name;
};
