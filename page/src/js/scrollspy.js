const menuItems = document.querySelectorAll('.nav__items-link');
const scrollSpySections = document.querySelectorAll('.section');
const lastSection = document.querySelector('.nav__items-link:last-of-type');

const handleCrollSpy = (params) => {
	if (document.body.classList.contains('main-page')) {
		const sections = [];
		scrollSpySections.forEach((section) => {

			if (window.scrollY <= section.offsetTop + section.offsetHeight - 103) {
				sections.push(section);
				const activeSection = document.querySelector(
					`[href*="${sections[0].id}"]`
				);
				menuItems.forEach((item) => item.classList.remove('active-link'));
				activeSection.classList.add('active-link');
			}

			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight - 100
			) {
                menuItems.forEach((item) => item.classList.remove('active-link'));
				lastSection.classList.add('active-link');
			}
		});
	}
};

window.addEventListener('scroll', handleCrollSpy);