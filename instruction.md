1. Cài đặt nodejs

2. Lệnh chạy Pug

- npm install -g pug
- npm install pug cli
- pug file.pug --watch

3. Lệnh chạy Scss (Có thể chạy bằng lệnh npm run scss khi cài đặt trình biên dịch Sass)

- scss ./scss/style.scss ./css/style.css --watch

4. Lệnh chạy Gulp

- npm install -g gulp
- npm install gulp-sass --save-dev

_SCSS convert, min, and autoprefix_

- npm install gulp-postcss autoprefixer gulp-sass gulp-clean-css --save-dev
- npm install --save-dev gulp-sass gulp-autoprefixer gulp-clean-css

_JS min_

- npm install --save-dev gulp-terser

_Image min and webp_

- npm install --save-dev gulp-imagemin gulp-webp

5. Add gulpfile.js

6. Tạo function, watchtask and default gulp

7. Run gulp
