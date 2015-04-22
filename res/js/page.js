$(document).ready(function(){

	var distance = getBoundaries();

	var n = 1;

	var speed = 10;

	$("#container").click(function(){

		if (n == 1) {

			$('body').css('overflow','hidden');
			clearInterval(changeBorder);

			var initialTop = parseInt($("#container").css("top").replace(/[^-\d\.]/g, ''));
			var initialLeft = parseInt($("#container").css("left").replace(/[^-\d\.]/g, ''));
			var initialRadius = parseInt($("#container").css("border-radius").replace(/[^-\d\.]/g, ''));
			var initialBorder = parseInt($("#container").css("border-width").replace(/[^-\d\.]/g, ''));

			var changeBorder = setInterval( function() {

				$("#container").css("border-width", ( initialBorder + speed * n ) + "px");
				$("#container").css("border-radius", ( initialRadius + 2 * n * speed ) + "px");
				$("#container").css("top", (initialTop - speed * n) + "px");
				$("#container").css("left", (initialLeft - speed * n) + "px");

				if (speed * n > distance) {
					clearInterval(changeBorder);
					$("#container").css("background", "white");
					$("#container").css("color", "tomato");
					$("body").css("background", "tomato");
					$("#container").css("border-width", "1px");
					$("#container").css("top", "100px");
					$("#container").css("left", "1000px");
					$('body').css('overflow', 'visible');
				}
				n++;
			}, 1);
		}

	})

})

function getBoundaries() {

	var distance = 0;

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var windowTop = $(window).scrollTop();

	var elementTop = $("#container").position().top - windowTop;
	var elementLeft = $("#container").position().left;
	var elementBottom = windowHeight - elementTop;
	var elementRight = windowWidth - elementLeft;

	var horizontal = Math.max(elementLeft, elementRight);
	var vertical = Math.max(elementTop, elementBottom);

	return distance = Math.sqrt( Math.pow(horizontal, 2) + Math.pow(vertical, 2) );
}

function changeBorder(speed) {				
}