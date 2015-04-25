;(function ( $, window, document, undefined ) {

	var windowHeight, windowWidth, windowTop,
		elementHeigh, elementWidth,
		elementTop, elementLeft, elementBottom, elementRight,
		horizontal, vertical, distance,
		initialTop, initialLeft, initialBorder;

    function Plugin( element, options ) {
	
		var defaults = {
	        speed: '800',
	        color: 'tomato',
	        file: 'new.php',
	        success: function() {}
	    }

	    // adapting user settings
	    this.settings = {}
	    this.settings = $.extend({}, defaults, options);

	    this.el = element;

	    this.init();

	    var done = this.el.data("done") || 0;

	    if ( !done ) {

	    	console.log("RUNNIN");

			this.ajax();
	    	this.startValues();

	    	this.run();

	    } else {

			$("body").css("background", "white");
	    	this.el.data("done", 0);

	    }

    };

	$.extend( Plugin.prototype, {

		init: function () {

			// measure distances

			windowHeight = $(window).height();
			windowWidth = $(window).width();
			windowTop = $(window).scrollTop();

			elementHeight = this.el.height();
			elementWidth = this.el.width();

			elementTop = this.el.position().top - windowTop;
			elementLeft = this.el.position().left;
			elementBottom = windowHeight - elementTop;
			elementRight = windowWidth - elementLeft;

			horizontal = Math.max(elementLeft, elementRight);
			vertical = Math.max(elementTop, elementBottom);

			distance = Math.sqrt( Math.pow(horizontal, 2) + Math.pow(vertical, 2) );

			// set up container div


		},
		ajax: function() {
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
		},
		startValues: function() {

			$("#fillScreen").css("top", elementTop + "px");
			$("#fillScreen").css("left", elementLeft + "px");

			$("#fillScreen").css("display", "block");
			$("#fillScreen").css({transform: "translate(-500px, 300px)"});

			$('body').css('overflow','hidden');
			this.el.css("background", "white");
			this.el.css("color", "tomato");
			this.el.css("cursor", "initial");

			initialTop = parseInt(this.el.css("top").replace(/[^-\d\.]/g, ''));
			initialLeft = parseInt(this.el.css("left").replace(/[^-\d\.]/g, ''));
			initialBorder = parseInt(this.el.css("border-width").replace(/[^-\d\.]/g, ''));

		},
		run: function() {
			var self = this;
			var n = 1;
			var speedUP = 5; //TEMPORARY !!!
			var running = setInterval( function() {
				if ( speedUP * n < distance) {
					console.log("RENDERIN");
					this.el.css("border-width", ( initialBorder + n * speedUP) + "px");
					this.el.css("top", (initialTop - n * speedUP) + "px");
					this.el.css("left", (initialLeft - n * speedUP) + "px");
					n++;
				} else {
					clearInterval(running);
					self.finish();
				}
			}, 1000 / this.settings.speed);
		},
		finish: function() {
			console.log("FINISHED");

			this.el.css("cursor", "pointer");

			this.el.css("border-width", initialBorder);
			this.el.css("top", initialTop);
			this.el.css("left", initialLeft);

			$("body").css("background", "tomato");
			$("body").css("overflow", "visible");

			this.settings.success();
	    	this.el.data("done", 1);
		}
	});

	$.fn.fillScreen = function( options ){

		if(!this.length) { 
			return this; 
		};

		this.bind("click.fillScreen", function (e) {
			e.preventDefault();
            var fill = new Plugin( $(this), options );
		});


	};

/*
	// Polyfill for requestAnimationFrame
	// via: https://gist.github.com/paulirish/1579671
	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());
*/

}(jQuery, window, document));