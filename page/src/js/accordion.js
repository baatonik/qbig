const accordionBtns = document.querySelectorAll('.accordion-btn');

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

accordionBtns.forEach((btn) => {
	btn.addEventListener('click', openAccordionItems);
});

window.addEventListener('click', clickOutsideAccordion);
