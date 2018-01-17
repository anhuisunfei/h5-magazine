var gulp = require('gulp') 
var prefixer = require('gulp-autoprefixer')
var minify = require('gulp-minify-css')
var imagemin = require('gulp-imagemin')
var wrap = require('gulp-wrap')
var browserSync = require('browser-sync')

function handleError(err) {
  console.log(err.toString())

  this.emit('end')
}

gulp.task('browser-sync', ['css', 'copy-assets'], function() {
  browserSync({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('rebuild', ['build'], function() {
  browserSync.reload()
})

gulp.task('build', function() {
  gulp
    .src('src/pages/*.html')
    .pipe(
      wrap({
        src: 'src/layout/_layout.html'
      })
    )
    .pipe(gulp.dest('./'))
})

gulp.task('imagemin', function() {
  gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./'))
})

 
gulp.task('css',function(){
  gulp.src('src/assets/styles/*.css')
  .pipe(prefixer())
  .pipe(minify())
  .pipe(gulp.dest('./assets/styles/'))
})

gulp.task('copy-assets', function() {
  gulp.src('src/index.html').pipe(gulp.dest('./'))
  gulp.src('src/assets/images/*.*').pipe(gulp.dest('./assets/images/'))
  console.log(123);
})

gulp.task('watch', function() {
  // gulp.watch('src/*.html',['copy-assets'])
  gulp.watch('src/**/*.html', ['rebuild'])
  gulp.watch('src/*.css', ['css'])
})

gulp.task('default', ['browser-sync', 'watch'])
