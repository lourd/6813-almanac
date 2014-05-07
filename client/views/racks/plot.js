Template.plotPage.rendered = function() {
	// var el = this.firstNode;
	// $('#plot-carousel').slickAdd(el);
	// console.log("plot rendered");

}

Template.plotPage.destroyed = function() {
	var el = this.firstNode;
	console.log("plot destroyed");
}

Template.plotPage.helpers({

});



