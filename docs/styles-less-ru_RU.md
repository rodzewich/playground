# Брендирование и локализация

## directory/filename.css
- вычисляется язык по умолчанию (например, en_US)
- строится зависимость по языкам
directory/filename/ru_RU.json
directory/filename/en_EN.json
directory/filename/en_UK.json
directory/filename/en_US.json
(список зависимостей определяется из конфига)
происходит мерж объектов (все переменные должны быть в верхнем underscore)

устанавливаем переменные и компилим
directory/filename.less => directory/filename.css

## directory/filename-es_PO.css
directory/filename/ru_RU.json
directory/filename/en_EN.json
directory/filename/en_UK.json
directory/filename/en_US.json
directory/filename/es_ES.json
directory/filename/es_PO.json
(список зависимостей определяется из конфига)
происходит мерж объектов (все переменные должны быть в верхнем underscore)
 
устанавливаем переменные и компилим
directory/filename.less => directory/filename-es_PO.css

## filename-123.css
- вычисляется язык по умолчанию (например, en_US)
- строится зависимость по языкам
directory/filename/ru_RU.json
directory/filename/en_EN.json
directory/filename/en_UK.json
directory/filename/en_US.json
(список зависимостей определяется из конфига)
происходит мерж объектов (все переменные должны быть в верхнем underscore)

устанавливаем переменные и компилим
directory/filename-123.less => directory/filename-123.css

если файла нет, то компилим так
directory/filename.less => directory/filename-123.css

## filename-123-es_PO.css
directory/filename/ru_RU.json
directory/filename/en_EN.json
directory/filename/en_UK.json
directory/filename/en_US.json
directory/filename/es_ES.json
directory/filename/es_PO.json
(список зависимостей определяется из конфига)
происходит мерж объектов (все переменные должны быть в верхнем underscore)

устанавливаем переменные и компилим
directory/filename-123.less => directory/filename-123.css

если файла нет, то компилим так
directory/filename.less => directory/filename-123.css

==========================
использование происходит через функцию
lang("USERS.VARIABLE_NAME"); - ищет переменную в конфиге текущего файла
lang("USERS.VARIABLE_NAME", "../source"); - ищет переменную в конфиге файла source
Функция умеет выдавать ошибки и предупреждения (предупреждения, могут отключаться)

- если переменная не находится, то это ошибка
- если переменная находится в другой локали по зависимостям, то это предупреждение
- анализируются все загруженные файлы языков, и если встречается нижний регистр, то выдается ошибка
