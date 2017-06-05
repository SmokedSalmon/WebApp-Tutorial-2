var Browser = require('zombie'),
	assert = require('chai').assert;

var browser;

/*
 * These test are carried out by the zombie headless browser to automaticlly
 * simulate a suite of cross-page user behavior.
 * The broser.visit method visit the 'referrer' URL with the callback function
 * where the correspondent test for that URL will be asserted.
 * In this case, each test will load a specific tour page, and simulates a click
 * with the <a> requestGroupRate, then assert if the referrer value forwarded to
 * the next page is as expected (in the requestGroupRate page, the referrer value
 * is passed from the document DOM object to a hidden input field through script)
 */
suite('Cross-Page Tests', function(){
        
        // setup takes place before EACH test is run by the test framework
        // Here a browser instance is created for EACH test
	setup(function(){
		browser = new Browser();
	});
        
	test('requesting a group rate quote from the hood river tour page should ' +
			'populate the hidden referrer field correctly', function(done){
		var referrer = 'http://localhost:3000/tours/hood-river';
		browser.visit(referrer, function(){
			browser.clickLink('.requestGroupRate', function(){
                                // browser.field returns a DOM Element object
                                // with 'value' property
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});

	test('requesting a group rate from the oregon coast tour page should ' +
			'populate the hidden referrer field correctly', function(done){
		var referrer = 'http://localhost:3000/tours/oregon-coast';
		browser.visit(referrer, function(){
			browser.clickLink('.requestGroupRate', function(){
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});

	test('visiting the "request group rate" page dirctly should result ' +
			'in an empty value for the referrer field', function(done){
		browser.visit('http://localhost:3000/tours/request-group-rate', function(){
			assert(browser.field('referrer').value === '');
			done();
		});
	});

});
