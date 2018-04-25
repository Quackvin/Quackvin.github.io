$(document).ready(function(){
	console.log($('#imagebox').height());
	$('#imagebox').height($(window).height() - $('#title').height()-35);
	console.log($('#imagebox').height(), $(window).height(), $('#title').height());
});

$(window).on('resize',function() { 
 	$('#imagebox').height($(window).height() - $('#title').height()-35);
 	console.log("new height is: "+$(window).height()); 
});