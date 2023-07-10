export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) { 
    items.forEach(this._renderer);//каждый элемент массива передан напрямую в _renderer
  }

  addItem(element) {
    this._container.prepend(element);
  }
}