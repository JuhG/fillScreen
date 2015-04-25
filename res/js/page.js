$(document).ready(function(){

	$('#container').fillScreen({
		// speed: 1000
	});

});

/* OLD ONE
	var distance = getBoundaries();

	var n = 1;

	var speed = 5;

	$("#cc").click(function(){

		var $this = $(this);

		if (n == 1) {

			var windowTop = $(window).scrollTop();
			var elementTop = $("#container").position().top - windowTop;
			var elementLeft = $("#container").position().left;

			ajax();

			$("#fillScreen").css("top", elementTop + "px");
			$("#fillScreen").css("left", elementLeft + "px");

			$("#fillScreen").css("display", "block");
			$("#fillScreen").css({transform: "translate(-500px, 300px)"});

			$('body').css('overflow','hidden');
			$($this).css("background", "white");
			$($this).css("color", "tomato");
			$($this).css("cursor", "initial");

			var initialTop = parseInt($($this).css("top").replace(/[^-\d\.]/g, ''));
			var initialLeft = parseInt($($this).css("left").replace(/[^-\d\.]/g, ''));
			var initialBorder = parseInt($($this).css("border-width").replace(/[^-\d\.]/g, ''));

			var changeBorder = setInterval( function() {

				$($this).css("border-width", ( initialBorder + speed * n ) + "px");
				$($this).css("top", (initialTop - speed * n) + "px");
				$($this).css("left", (initialLeft - speed * n) + "px");

				if (speed * n > distance) {

					clearInterval(changeBorder);
					$($this).css("cursor", "pointer");

					$($this).css("border-width", initialBorder);
					$($this).css("top", initialTop);
					$($this).css("left", initialLeft);

					$("body").css("background", "tomato");
					$('body').css('overflow', 'visible');
				}

				n++;

			}, 1);

		} else if (speed * n > distance) {

			$("body").css("background", "white");
			n = 1;

		} else {

		}

	})


function getBoundaries() {

	//var height = alma.height();

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

function ajax() {
	$.ajax({
		url: "new.php",
		type: "GET",
		dataType: "html",
		success: function(r) {

			if (!r) {

				$("body").prepend("Not found!");

			} else {

				$("#fillScreen").prepend(r);

			}
		},
		error: function(r) {
			console.log(r.responseText);
		}
	});
	return false;
}*/