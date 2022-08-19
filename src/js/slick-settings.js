//Slick settings
$('.projects-carousel').slick({
	arrows: false,
	autoplay: true,
	mobileFirst: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: true,
	pauseOnHover: true,
	responsive: [
		{
			breakpoint: 484,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
			},
		},
	],
});
