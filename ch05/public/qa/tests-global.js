// What is test suite? please familiarize yourself with the concept
// Add a test suite to varify if this page contain valid title
// This test is to be carried out in all pages.
suite('Global Tests', function(){
	test('page has a valid title', function(){
		assert(document.title && document.title.match(/\S/) && 
			document.title.toUpperCase() !== 'TODO');
	});
});
