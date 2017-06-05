// What is test suite? please familiarize yourself with the concept
// Add a test suite to varify if this page contain a contact link to '/contact'
suite('"About" Page Tests', function(){
	test('page should contain link to contact page', function(){
		assert($('a[href="/contact"]').length);
	});
});
