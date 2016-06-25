'use strict';

function renderPortfolio(jsonp) {
	var container = document.getElementById('portfolio_grid');
	var items = '';
	jsonp.projects.forEach(function (item) {
		items += '<figure class="portfolio_item">';
		items += '<img src="https://res.cloudinary.com/siamkreative/image/fetch/' + item.covers[404] + '" alt="' + item.name + '">';
		items += '<figcaption>';
		items += '<div class="portfolio_desc">';
		items += '<h4>' + item.name + '</h4>';
		items += '<p>' + item.fields.join(' + ') + '</p>';
		items += '<a class="btn" href="' + item.url + '" target="_blank">Details</a>';
		items += '</div>';
		items += '</figcaption>';
		items += '</figure>';
	});

	// Hide the grid while we wait until images are ready
	container.style.display = 'none';

	// Append all items only once
	container.innerHTML = items;

	// Once all images are loaded, show the grid
	imagesLoaded(container, function () {
		container.style.display = 'block';
	});
}

/**
 * Form Functions
 * 1) Show field based on checkbox
 * 2) Prevent multiple form submissions
 * 3) Add geolocation data
 */
function showHideItem() {
	var checkbox = document.getElementById('inquiry_type');
	var target = document.getElementsByName('inquiry_type_other')[0];
	var container = target.parentNode;
	if (checkbox.checked) {
		container.style.display = 'block';
		target.setAttribute('required', 'required');
		target.disabled = false;
	} else {
		container.style.display = 'none';
		target.removeAttribute('required');
		target.disabled = true;
	}
}

function checkForm(form) {
	form.submit.disabled = true;
	form.submit.value = "Please wait...";
	document.getElementsByName('_subject')[0].value += document.getElementsByName('name')[0].value;
	return true;
}

function resetForm(form) {
	form.submit.disabled = false;
	form.submit.value = "Send Inquiry";
}

function formGeolocation(jsonp) {
	var form = document.getElementById('contact_form');
	var dynamicItems = '<input type="hidden" name="gps" value="https://maps.google.com?q=' + jsonp.latitude + ',' + jsonp.longitude + '"/>';
	// Visit non-inherited enumerable keys
	Object.keys(jsonp).forEach(function (key) {
		dynamicItems += '<input type="hidden" name="geolocation[' + key + ']" value="' + jsonp[key] + '"/>';
	});
	form.innerHTML += dynamicItems;
}

document.addEventListener('DOMContentLoaded', function () {

	/**
	 * Full height section on large screens
	 * https://github.com/alvarotrigo/fullPage.js/tree/master/pure%20javascript%20(Alpha)
	 */
	fullpage.initialize('#fullpage', {
		anchors: [
			'DigitalStudio',
			'WhatWeDo',
			'WhyUs',
			'ClientStories',
			'Clients',
			'Inquiry'
		],
		menu: '#menu',
		css3: true
	});

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

	/**
	 * Contact Form
	 */
	showHideItem();

	/**
	 * Why Us: Show only 3 random reasons
	 * http://stackoverflow.com/a/11972692/1414881
	 */
	var max = 3;
	var parent = document.getElementById('reasons');
	var children = document.getElementById('reasons').getElementsByTagName('div');

	// Shuffle the HTML
	for (var i = children.length; i >= 0; i--) {
		parent.appendChild(children[Math.random() * i | 0]);
	}
	// Find 3 #reasons and hide them
	for (var i = 0, max; i < max; i++) {
		children[i].style.display = 'none';
	}

});