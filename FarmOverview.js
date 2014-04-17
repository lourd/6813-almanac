$(function () {
	$("#Greenhouse1Table").hide();
	$("#ShippingContainerATable").hide();

	$("#Greenhouse1Button").click( function() {
		var button = document.getElementById("Greenhouse1Button");
		if (button.value === "+"){
			button.value = "-";
			$("#Greenhouse1Table").show();
		}
		else{
			button.value = "+";
			$("#Greenhouse1Table").hide();
		}
	});

	$("#ShippingContainerAButton").click( function() {
		var button = document.getElementById("ShippingContainerAButton");
		if (button.value === "+"){
			button.value = "-";
			$("#ShippingContainerATable").show();
		}
		else{
			button.value = "+";
			$("#ShippingContainerATable").hide();
		}
	});

});