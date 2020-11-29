import { isNull } from '~/helpers';
export default function position(coords) {
  if(isNull(coords)) {
    return this._position;
  }

  if (typeof coords === 'function') {
    // something will go here
  } else {
    this._position = Object.assign({}, this._position, coords);
  }

  return this;
}

export function top(y) {
  if(isNull(y)) {
    return this.position().y
  }
  return position.call(this, {y})
}

export function left(x) {
  if(isNull(x)) {
    return this.position().x
  }
  return position.call(this, {x})
}
