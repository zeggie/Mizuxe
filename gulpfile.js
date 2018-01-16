//  Use to compile SCSS  - move file from node module folder to source folder  - run dev server with browser side
const gulp = require('gulp');   //  Call in gulp
const browserSync = require('browser-sync').create();  //  Call in browser-sync
const sass = require('gulp-sass');

//  Task 1 - Compile Sass & Inject into Browser
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])   // compile bootstraps + our own scss file
  .pipe(sass())                 //  pipe in sass function to do this task
  .pipe(gulp.dest("src/css"))   //  tell function where to compile these file to
  .pipe(browserSync.stream());  //  call browsersync stream function
});

//  Task 2 - Move JS files to src/js
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest("src/js"))    //  compile the above files to src/js
  .pipe(browserSync.stream());
});

//  Task 3 - Watch Sass & Server
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/boostrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

//  Task 4 - Move fonts folder to src/fonts
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("src/fonts"));
});

//  Task 5 - Move Font Awesome to src/css
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("src/css"));
});

//  Create a default Gulp task to run all the above

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);