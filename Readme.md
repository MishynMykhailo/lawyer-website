# Сборка gulp шаблона

Для корректной работы нужно установить gulp-cli глобально:
`npm i gulp-cli -g`

использованные зависимости
1.gulp-cli
2."sass"
использованные dev зависимости
"gulp" - сам gulp
"del" - для удаления папок
"gulp-file-include" - для использования @@includes в файлах
"browsersync" - live-server
"gulp-notify" - вывод уведомления
"gulp-plumber" - для вывода уведомления в самой ОС
"gulp-rename" - для переименования файлов
"gulp-replace" - для замены пути
"gulp-sass" - для компиляции sass
"gulp-version-number" - для добавления уник.идентификатора к файлам,чтобы не кешировались
"gulp-autoprefixer" - добавление вендорных префиксов
"gulp-clean-css" - сжатие css
"gulp-group-css-media-queries" - группировка медиа запросов
"gulp-webpcss" - вывод WEBP изображений
"webp-converter" - для работы gulp-webpcss
"webpack-stream" - для js файлов
"gulp-webp" - для images
"gulp-imagemin" - для конвертированния в webp
"gulp-newer" - для проверки, обновилась ли картинка действительно
"gulp-fonter" -
"gulp-ttf2woff2" -
"gulp-svg-sprite" - для собрки всех svg в спрайт
"gulp-zip" - для создания zip
