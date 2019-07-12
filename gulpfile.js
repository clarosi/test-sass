const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const SCSS = 'sass';
const DEST = 'src/css';
const SCSS_LOCATION = 'src/scss/*.scss';
const HTML_LOCATION = 'src/public/*.html';

// Compile Sass
gulp.task(SCSS, () =>
  gulp
    .src([SCSS_LOCATION])
    .pipe(sass())
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream())
);

// Watch & Serve
gulp.task(
  'serve',
  gulp.series(SCSS, function() {
    browserSync.init({ server: './src' });
    gulp.watch([SCSS_LOCATION], gulp.series(SCSS));
    gulp.watch([HTML_LOCATION]).on('change', browserSync.reload);
  })
);

// Default;
gulp.task('default', gulp.series('serve'));
