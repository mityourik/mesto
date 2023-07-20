export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, user) {// проверить
    items.forEach(item => {
      this._renderer(item, user);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}