const nav = document.querySelector('.nav');
const burgerBtn = document.querySelector('.burger-btn');
const allNavItems = document.querySelectorAll('.nav__items-item');
const burgerBtnBars = document.querySelector('.burger-btn__bars');
const allSections = document.querySelectorAll('.section');
const footerYear = document.querySelector('.footer__year');
const headingText = document.querySelector('.header__text');
const expandableSlider = document.querySelector('.expandable-slider');
const expandableSliderItems = document.querySelectorAll(
	'.expandable-slider__item'
);
const body = document.body;

const handleNav = () => {
	// if (nav.classList.contains('nav--active')) {
	// 	body.style.overflow = 'visible';
	// } else {
	// 	body.style.overflow = 'hidden';
	// }

	nav.classList.toggle('nav--active');
	burgerBtnBars.classList.remove('red-bars-color');

	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active');
			body.style.overflow = 'visible';
			deleteAnimation();
		});
	});
	handleNavItemsAnimation();
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

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

const handleObserver = () => {
	const currentSection = window.scrollY;

	allSections.forEach((section) => {
		if (
			section.classList.contains('light-section') &&
			section.offsetTop <= currentSection + 50
		) {
			burgerBtnBars.classList.add('red-bars-color');
		} else if (
			!section.classList.contains('light-section') &&
			section.offsetTop <= currentSection + 50
		) {
			burgerBtnBars.classList.remove('red-bars-color');
		}
	});
};

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

handleCurrentYear();
burgerBtn.addEventListener('click', handleNav);
expandableSliderItems.forEach((item) =>
	item.addEventListener('click', showSlide)
);
window.addEventListener('scroll', handleObserver);
