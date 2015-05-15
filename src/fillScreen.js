;(function ( $, window, document, undefined ) {

	var windowHeight, windowWidth, elementHeight, elementWidth, distance;
	var elementTop, elementLeft;

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

	$.fn.fillScreen = function( options ){

		if(!this.length) { 
			return this; 
		};

		this.bind("click.fillScreen", function (e) {
			e.preventDefault();
            var fill = new Plugin( $(this), options );
		});
	};

    function Plugin( element, options ) {
	
		var defaults = {
	        velocity: 2,
	        acceleration: 5,
	        color: element.css("background-color") || element.css("background") || 'red',
	        success: function() {}
	    }

	    this.settings = {}
	    this.settings = $.extend({}, defaults, options);

	    this.el = element;

	    this.init();

	    this.done = this.el.data("done") || 0;
	    this.running = this.el.data("running") || 0;

	    if ( !this.done && !this.running ) {

	    	console.log("RUNNIN");
			this.el.data("running", 1);

	    	this.run();

	    } else {

	    	console.log(this.running);

	    	if ( !this.running ) {
	    		console.log("RESETED");
				var canvas = document.getElementById('canvas');
				$(canvas).remove();
				this.el.data("done", 0);
	    	}

	    }

    };

    $.extend( Plugin.prototype, {

		init: function () {

			windowHeight = $(window).height();
			windowWidth = $(window).width();
			elementHeight = this.el.height();
			elementWidth = this.el.width();

			elementTop = this.el.position().top + elementHeight / 2;
			elementLeft = this.el.position().left + elementWidth / 2;
			var elementBottom = windowHeight;
			var elementRight = windowWidth;

			var horizontal = Math.max(elementLeft, elementRight);
			var vertical = Math.max(elementTop, elementBottom);

			distance = Math.ceil( Math.sqrt( Math.pow(horizontal, 2) + Math.pow(vertical, 2) ) );
		},
		run: function () {

			var self = this;

			// $('body').css('overflow','hidden');

			var canvas = '<canvas id="canvas" width="' + windowWidth + '" height="' + windowHeight + '"></canvas>';
			var $canvas =  $(canvas);
			$canvas.appendTo('body');
			$canvas.css({
				position: "fixed",
			    left: 0,
			    top: 0
			});

			canvas = document.getElementById('canvas');
			var ctx = canvas.getContext('2d');

			ctx.fillStyle = this.settings.color;
			var pixelsPerFrame = this.settings.velocity;
			var acceleration = this.settings.acceleration;

			var centerX = elementLeft;
			var centerY = elementTop;
			var radius = pixelsPerFrame + elementHeight / 2;

			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			ctx.fill();

			var requestID;
			requestID = requestAnimationFrame(animate);
			var isBusy = false;

			function animate() {
				requestAnimationFrame(animate);
				if (!isBusy) {
					isBusy = true;
				  	if (radius <= distance) {
				  		ctx.clearRect ( centerX - radius , centerY - radius, 2 * radius, 2 * radius );
			    		radius += pixelsPerFrame;	  			
					    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
						ctx.fill();
						pixelsPerFrame = pixelsPerFrame * (1 + acceleration/100);
						isBusy = false;
				  	} else {
				  		console.log("FINISHED");
				    	cancelAnimationFrame(requestID);
						self.el.data("done", 1);
						self.el.data("running", 0);
				  	}
				}
			}

		}
	});

}(jQuery, window, document));