const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const clean = require('gulp-clean');
const kit = require('gulp-kit');

const paths = {
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	ts: './src/ts/**/*.ts',
	img: './src/img/*',
	imgIcons: './src/img/icons/*',
	imgExpandSlider: './src/img/expandable_slider/*',
	imgGalleryAutomatMachineInstallation:
		'./src/img/gallery/automatic_machine_installation/*',
	imgGalleryAutomatScrewSystem: './src/img/gallery/automatic_screw_system/*',
	imgGalleryLineInstallation: './src/img/gallery/line_installation/*',
	imgGalleryTechnologyTools: './src/img/gallery/technology_tools/*',
	imgGalleryTestingMachine: './src/img/gallery/testing_machine/*',
	sassDest: './dist/css',
	jsDest: './dist/js',
	tsDest: './dist/ts',
	imgDest: './dist/img',
	imgIconsDest: './dist/img/icons',
	imgExpandSliderDest: './dist/img/expandable_slider',
	imgGalleryAutomatMachineInstallationDest:
		'./dist/img/gallery/automatic_machine_installation',
	imgGalleryAutomatScrewSystemDest: './dist/img/gallery/automatic_screw_system',
	imgGalleryLineInstallationDest: './dist/img/gallery/line_installation',
	imgGalleryTechnologyToolsDest: './dist/img/gallery/technology_tools',
	imgGalleryTestingMachineDest: './dist/img/gallery/testing_machine',
	dist: './dist',
	html: './html/**/*.kit',
};

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));
	done();
}

function javaScript(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest));
	done();
}

function typeScript(done){
	src(paths.ts)
		.pipe(sourcemaps.init())
		.pipe(
			(ts({
				noImplicitAny: true,
				target:'ES6',
			}))
		)
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.tsDest));
	done();
}

function convertImages(done) {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest));
	src(paths.imgIcons).pipe(imagemin()).pipe(dest(paths.imgIconsDest));
	src(paths.imgExpandSlider)
		.pipe(imagemin())
		.pipe(dest(paths.imgExpandSliderDest));
	src(paths.imgGalleryAutomatMachineInstallation)
		.pipe(imagemin())
		.pipe(dest(paths.imgGalleryAutomatMachineInstallationDest));
	src(paths.imgGalleryAutomatScrewSystem)
		.pipe(imagemin())
		.pipe(dest(paths.imgGalleryAutomatScrewSystemDest));
	src(paths.imgGalleryLineInstallation)
		.pipe(imagemin())
		.pipe(dest(paths.imgGalleryLineInstallationDest));
	src(paths.imgGalleryTechnologyTools)
		.pipe(imagemin())
		.pipe(dest(paths.imgGalleryTechnologyToolsDest));
	src(paths.imgGalleryTestingMachine)
		.pipe(imagemin())
		.pipe(dest(paths.imgGalleryTestingMachineDest));
	done();
}

function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest('./'));
	done();
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
	done();
}

function watchForChanges(done) {
	watch('./*.html').on('change', reload);
	watch(
		[paths.html, paths.sass, paths.js, paths.ts],
		parallel(handleKits, sassCompiler, javaScript, typeScript)
	).on('change', reload);
	watch(paths.img, convertImages).on('change', reload);
	watch(paths.imgExpandSlider, convertImages).on('change', reload);
	watch(paths.imgGalleryAutomatMachineInstallation, convertImages).on(
		'change',
		reload
	);
	watch(paths.imgGalleryAutomatScrewSystem, convertImages).on('change', reload);
	watch(paths.imgGalleryLineInstallation, convertImages).on('change', reload);
	watch(paths.imgGalleryTechnologyTools, convertImages).on('change', reload);
	watch(paths.imgGalleryTestingMachine, convertImages).on('change', reload);
	done();
}

function cleanStuff(done) {
	src(paths.dist, { read: false }).pipe(clean());
	done();
}

const mainFunctions = parallel(
	handleKits,
	sassCompiler,
	javaScript,
	typeScript,
	convertImages
);

exports.cleanStuff = cleanStuff;
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
