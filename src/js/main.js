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
const allGalleryImages = document.querySelectorAll('.gallery__container img');
const lightbox = document.querySelector('.lightbox-mini');
const closeLightboxBtn = document.querySelector('.lightbox-mini__close-btn');
const prevLightboxBtn = document.querySelector('.lightbox-mini__previous-btn');
const nextLightboxBtn = document.querySelector('.lightbox-mini__next-btn');
const imgSlide = document.querySelector('.lightbox-mini__img');
const imgsGalleryNameMap = new Map();
const body = document.body;

let selectedGalleryName;
let index = 0;

//handle gallery
const selectImg = (e) => {
	const target = e.target.dataset;
	selectedGalleryName = target.galleryName;
	index = parseInt(target.gallerySlideNum);
	showImg(selectedGalleryName, index);
	showLightbox();
};

const showImg = (galleryName, imgNum) => {
	const displayedImg = document.querySelector(
		`[data-gallery-name='${galleryName}'][data-gallery-slide-num='${imgNum}']`
	);
	const displayedImgPath = displayedImg.getAttribute('src');
	imgSlide.setAttribute('src', displayedImgPath);
	loadImagesInGalleryToMap(galleryName);
};

const loadImagesInGalleryToMap = (galleryName) => {
	const allImagesInGallery = document.querySelectorAll(
		`[data-gallery-name='${galleryName}']`
	);

	allImagesInGallery.forEach((image) => {
		imgsGalleryNameMap.set(
			parseInt(image.dataset.gallerySlideNum),
			image.getAttribute('src')
		);
	});
};

const showLightbox = () => {
	burgerBtn.style.display = 'none';
	nav.style.display = 'none';
	body.style.overflow = 'hidden';
	lightbox.style.display = 'block';
};

const closeLightbox = () => {
	if (window.innerWidth >= 768) {
		nav.style.display = 'flex';
	} else {
		burgerBtn.style.display = 'block';
	}

	imgsGalleryNameMap.clear();
	body.style.overflow = 'visible';
	lightbox.style.display = 'none';
};

const changeSlide = (n) => {
	index += n;

	if (index > imgsGalleryNameMap.size - 1) {
		index = 0;
	}

	if (index < 0) {
		index = imgsGalleryNameMap.size - 1;
	}

	imgSlide.setAttribute('src', imgsGalleryNameMap.get(index));
};

const zoomImg = (e) => {
	const x = e.clientX;
	const y = e.clientY;

	const imgX = imgSlide.offsetLeft;
	const imgY = imgSlide.offsetTop;

	const newX = (imgX - x) * -1;
	const newY = (imgY - y) * -1;

	imgSlide.style.transformOrigin = `${newX}px ${newY}px`;

	imgSlide.classList.add('zoom-img');
};

const resetImg = () => {
	imgSlide.classList.remove('zoom-img');
	imgSlide.removeEventListener('mousemove', zoomImg);
};

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
	body.classList.toggle('sticky-body');
	buttonLines.forEach((line) => {
		line.classList.toggle('active-line');
	});
	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active');
			body.classList.remove('sticky-body');
			deleteAnimation();
		});
	});
	handleNavItemsAnimation();
};

const handleNavBarLogo = () => {
	if (nav.classList.contains('nav--active')) {
		nav.classList.remove('nav--active');
		body.classList.remove('sticky-body');
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
allGalleryImages.forEach((img) => {
	img.addEventListener('click', selectImg);
});
closeLightboxBtn.addEventListener('click', closeLightbox);
prevLightboxBtn.addEventListener('click', () => {
	changeSlide(-1);
});
nextLightboxBtn.addEventListener('click', () => {
	changeSlide(1);
});
imgSlide.addEventListener('click', () => {
	imgSlide.addEventListener('mousemove', zoomImg);
});
imgSlide.addEventListener('mouseout', resetImg);
window.addEventListener('click', clickOutsideAccordion);
