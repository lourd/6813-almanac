Template.slidePage.helpers({
	isGraph: function(plotName) {
		return false;
	}
});

Template.slickPage.rendered = function() {
	var el = this.firstNode;
	$('#plot-carousel').slickAdd(el);
	console.log("slide rendered");
}

Template.slickPage.created = function() {
	console.log("created");
}