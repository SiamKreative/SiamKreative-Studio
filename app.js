'use strict';

document.addEventListener('DOMContentLoaded', function () {

	/**
	 * Smooth Scroll
	 * https://github.com/cferdinandi/smooth-scroll
	 */
	smoothScroll.init();

	/**
	 * Instafeed.js
	 * http://instafeedjs.com/
	 */
	var count;
	var item;
	var itemFirst;
	var itemLast;
	var target = document.getElementById("instagram_gallery");
	var userFeed = new Instafeed({
		target: 'instagram_gallery',
		get: 'user',
		userId: '514502257',
		accessToken: '514502257.6fda5f5.37de1b87951a4ad08979990302aedb04',
		limit: 21,
		after: function () {
			item = target.childNodes;
			itemFirst = target.firstElementChild;
			itemLast = item[item.length - 1];
			count = item.length;

			// Check if enough photos on instagram. Minimum should be 21 (3x7)
			if (count >= 21) {
				return;
			} else {
				// Clone the first item at the end of the gallery
				target.innerHTML += itemFirst.outerHTML;
			}
		}
	});

	// Run Instafeed
	userFeed.run();

	/**
	 * Slider
	 * https://github.com/wilddeer/Peppermint
	 */
	var sliderPrev = document.getElementById('testimonials-arr-prev');
	var sliderNext = document.getElementById('testimonials-arr-next');
	var slider = Peppermint(document.getElementById('testimonials-slider'), {
		dots: true,
		slideshow: true,
		speed: 500,
		slideshowInterval: 5000,
		// this is not working with the custom controls
		stopSlideshowAfterInteraction: true
	});

	// Add prev/next controls
	sliderPrev.addEventListener('click', slider.prev, false);
	sliderNext.addEventListener('click', slider.next, false);

});