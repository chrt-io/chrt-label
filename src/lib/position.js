import { isNull } from '~/helpers';
export default function position(coords) {
  if(isNull(coords)) {
    return this;
  }

  if (typeof coords === 'function') {
    // something will go here
  } else {
    this._position = Object.assign({}, this._position, coords);
  }

  return this;
}

export function top(y) {
  return position.call(this, {y})
}

export function left(x) {
  return position.call(this, {x})
}
