const burgerBtn = document.querySelector('.burger-btn');
const navTopMenu = document.querySelector('.nav');
const allGalleryImages = document.querySelectorAll('.gallery__container img');
const lightbox = document.querySelector('.lightbox-mini');
const closeBtn = document.querySelector('.lightbox-mini__close-btn');
const prevBtn = document.querySelector('.lightbox-mini__previous-btn');
const nextBtn = document.querySelector('.lightbox-mini__next-btn');
const imgSlide = document.querySelector('.lightbox-mini__img');
const imgsGalleryNameMap = new Map();
const body = document.body;

let selectedGalleryName;
let index = 0;

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
	navTopMenu.style.display = 'none';
	body.style.overflow = 'hidden';
	lightbox.style.display = 'block';
};

const closeLightbox = () => {
	if(window.innerWidth >= 768){
		navTopMenu.style.display = 'flex';
	}else{
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

allGalleryImages.forEach((img) => {
	img.addEventListener('click', selectImg);
});
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => {
	changeSlide(-1);
});
nextBtn.addEventListener('click', () => {
	changeSlide(1);
});
