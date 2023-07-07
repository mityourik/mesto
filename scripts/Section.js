export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;//функция-рендерер для вызова при создании секции
    this._container = document.querySelector(containerSelector);//контейнер, в который будут добавляться элементы
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);//вызов функции-рендерер для каждого элемента в переданном массиве
    });
  }

  addItem(element) {
    this._container.prepend(element);// добавляем элемент в начало контейнера
  }
}