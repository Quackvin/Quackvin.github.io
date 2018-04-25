$(document).ready(function(){
	var pjs;
	$.getJSON("../data/particle.json", function(data){
		particlesJS("heading",data);
	});

});