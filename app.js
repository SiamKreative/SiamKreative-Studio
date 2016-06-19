'use strict';

document.addEventListener('DOMContentLoaded', function () {

	/**
	 * Instafeed.js
	 * http://instafeedjs.com/
	 */
	var userFeed = new Instafeed({
		target: 'instagram_gallery',
		get: 'user',
		userId: '514502257',
		accessToken: '514502257.6fda5f5.37de1b87951a4ad08979990302aedb04',
		limit: 16
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