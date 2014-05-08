Template.slidePage.helpers({
	isGraph: function(plotName) {
		return false;
	}
});

Template.slidePage.rendered = function() {
	console.log("slide rendered");
	var el = this.firstNode;
	console.log(el);

	$('#plot-carousel').slickAdd(el);	
	// $(el).addClass("slick-slide ui-selectee");

	// var car = document.getElementsByClassName("slick-track");
	// car[0].appendChild(el);
	// console.log(el);

}

Template.slidePage.created = function() {
	console.log("slide created");
}