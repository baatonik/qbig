const nav = document.querySelector('.nav');
const burgerBtn = document.querySelector('.burger__btn');
const buttonLines = Array.from(document.querySelectorAll('.burger__btn--line'));
const allNavItems = document.querySelectorAll('.nav__items-item');
const shortSections = document.querySelectorAll('.short-section');
const longSections = document.querySelectorAll('.long-section');
const allMenuLinks = document.querySelectorAll('.nav__items-link');
const footerYear = document.querySelector('.footer__year');
const headingText = document.querySelector('.header__text');
const expandableSlider = document.querySelector('.expandable-slider');
const expandableSliderItems = document.querySelectorAll(
	'.expandable-slider__item'
);
const accordionBtns = document.querySelectorAll('.accordion-btn');
const navBarLogo = document.querySelector('.navbar__logo');

//intersection observer
const shortObserverOptions = {
	threshold: [0.5],
};
const longObserverOptions = {
	threshold: [0.1],
};

const observerShortSections = new IntersectionObserver(
	handleObserver,
	shortObserverOptions
);
const observerLongSections = new IntersectionObserver(
	handleObserver,
	longObserverOptions
);

function handleObserver(entries) {
	entries.forEach((entry) => {
		const section = entry.target;
		const activeNav = document.querySelector(`a[href='#${section.id}']`);
		if (entry.isIntersecting) {
			allMenuLinks.forEach((item) => item.classList.remove('active-link'));
			activeNav.classList.add('active-link');
		}
	});
}

//navigation handle
const handleNav = () => {
	nav.classList.toggle('nav--active');
	document.body.classList.toggle('sticky-body');
	buttonLines.forEach((line) => {
		line.classList.toggle('active-line');
	});
	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active');
			document.body.classList.remove('sticky-body');
			deleteAnimation();
		});
	});
	handleNavItemsAnimation();
};

const handleNavBarLogo = () => {
	if (nav.classList.contains('nav--active')) {
		nav.classList.remove('nav--active');
		document.body.classList.remove('sticky-body');
		deleteAnimation();
		resetBurgerBtn();
	}
};

const resetBurgerBtn = () => {
	buttonLines.forEach((line) => {
		line.classList.toggle('active-line');
	});
};

const handleNavItemsAnimation = () => {
	let delayTime = 0;

	allNavItems.forEach((item) => {
		item.classList.toggle('nav-items-animation');
		item.style.animationDelay = '.' + delayTime + 's';
		delayTime++;
	});
};

const deleteAnimation = () => {
	allNavItems.forEach((item) => {
		item.classList.remove('nav-items-animation');
	});
};

//footer year
const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

//expandable slider handle
function showSlide() {
	expandableSliderItems.forEach((item) => {
		item.classList.remove('active');
		this.classList.add('active');
	});

	handleBgColor(this);
}

const handleBgColor = (item) => {
	const slide = item.getAttribute('data-slide');
	expandableSlider.setAttribute('data-bg', slide);
};

//AOS settings
AOS.init({
	startEvent: 'DOMContentLoaded',
	offset: 200,
	once: true,
});

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

//accordion handle
function openAccordionItems() {
	if (!this.nextElementSibling.classList.contains('active')) {
		closeAccordionItems();
	}
	this.nextElementSibling.classList.toggle('active');
}

const closeAccordionItems = () => {
	const allActiveItems = document.querySelectorAll('.gallery__box');
	allActiveItems.forEach((item) => {
		item.classList.remove('active');
	});
};

const clickOutsideAccordion = (e) => {
	if (
		e.target.classList.contains('accordion-btn') ||
		e.target.classList.contains('gallery__box')
	) {
		return;
	}
	closeAccordionItems();
};

//callback, listeners
handleCurrentYear();
burgerBtn.addEventListener('click', handleNav);
allMenuLinks.forEach((links) => {
	links.addEventListener('click', resetBurgerBtn);
});
navBarLogo.addEventListener('click', handleNavBarLogo);
expandableSliderItems.forEach((item) =>
	item.addEventListener('click', showSlide)
);
accordionBtns.forEach((btn) => {
	btn.addEventListener('click', openAccordionItems);
});
shortSections.forEach((section) => {
	observerShortSections.observe(section);
});
longSections.forEach((section) => {
	observerLongSections.observe(section);
});
window.addEventListener('click', clickOutsideAccordion);
