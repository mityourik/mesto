# Проектная работа: Mesto. Восьмой спринт. 

## Описание проекта

В данной проектной работе мы продолжаем заниматься рефакторингом и настройкой сборки проекта с использованием Webpack. Мы создаем несколько классов и настраиваем связи между ними. В конце проектной работы настроили сборку проекта с помощью Webpack.

## Запуск проекта

Для просмотра проекта на локальной машине выполните следующие шаги:

1. Клонируйте репозиторий на локальную машину.
2. Запустите проект с помощью команды `npm run dev`.
3. Откройте веб-браузер и перейдите по адресу `http://localhost:8080`.

Для просмотра проекта через сайт github.com перейдите по ссылке: `https://mityourik.github.io/mesto/`

## Используемые технологии

В данном проекте мы использовали следующие технологии:

- HTML
- CSS
- JavaScript (ООП)
- Webpack

## Структура проекта

В проекте используется модульная структура, разделяющая код на отдельные файлы и классы. Вот основные файлы и папки в проекте:

- `src` - папка, содержащая исходный код проекта.
  - `index.js` - главный файл, в котором создаются экземпляры классов и добавляются обработчики.
  - `index.html` - главный HTML-файл проекта.
  - `index.css` - папка со стилями CSS.
  - `components` - папка с компонентами главного файла со скриптами JavaScript.
    - `Card.js` - класс создания карточки.
    - `Section.js` - класс для отрисовки элементов на странице.
    - `Popup.js` - класс для работы с попапами.
    - `PopupWithImage.js` - класс, наследующийся от Popup, для попапа просмотра карточки.
    - `PopupWithForm.js` - класс, наследующийся от Popup, для работы с формой в попапе.
    - `UserInfo.js` - класс для управления отображением информации о пользователе на странице.
  - `utils` - папка с вспомогательными данными
    - `constants.js` - файл с переменными с массивом карточек и настройками для валидации форм и селекторов элементов

## Команда проекта

Проект выполнил Дмитрий Орлов

## Лицензия

*не применимо*