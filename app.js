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
	var dynamicItems = '';
	// Visit non-inherited enumerable keys
	Object.keys(jsonp).forEach(function (key) {
		dynamicItems += '<input type="hidden" name="geolocation[' + key + ']" value="' + jsonp[key] + '"/>'
	});
	form.innerHTML += dynamicItems;
}

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
		template: '<a href="{{link}}" target="_blank" title="{{caption}}"><img width="150" height="150" src="{{image}}" alt="{{caption}}"/></a>',
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

	/**
	 * Contact Form
	 */
	showHideItem();

});