var gulp = require("gulp"),
  sass = require("gulp-sass"),
  plugins = require("gulp-load-plugins")(),
  uglify = require("gulp-uglify"),
  source = "./dev",
  destination = "./dist";

//////////////////////////////////////////
// TASKS //
//////////////////////////////////////////

gulp.task("sass", function () {
  return gulp
    .src(source + "/styles/main.scss")
    .pipe(plugins.sass())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest(destination));
});

gulp.task("index", function () {
  return gulp.src(source + "/index.php").pipe(gulp.dest(destination));
});

gulp.task("views", function () {
  return gulp
    .src(source + "/views/**/*")
    .pipe(gulp.dest(destination + "/views"));
});

gulp.task("js", function () {
  return gulp
    .src([source + "/angular/**/*.js", source + "/angular/*.js"])
    .pipe(plugins.concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest(destination));
});

gulp.task("sources", function () {
  return gulp
    .src(source + "/sources/**/*")
    .pipe(gulp.dest(destination + "/sources"));
});

gulp.task("includes", function () {
  return gulp
    .src(source + "/includes/*")
    .pipe(gulp.dest(destination + "/includes"));
});

//////////////////////////////////////////
// BUILD // WATCH //
//////////////////////////////////////////
gulp.task("build", ["sass", "index", "views", "js", "sources", "includes"]);

gulp.task("watch", function () {
  gulp.watch(
    [
      source + "/styles/*.scss",
      source + "/index.php",
      source + "/views/**/*",
      source + "/angular/**/*.js",
      source + "/angular/*.js",
      source + "/sources/**/*",
      source + "/includes/*"
    ],
    ["build"]
  );
});

gulp.task("default", ["build"]);
