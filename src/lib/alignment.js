import { isNull } from '../helpers';
export default function alignment(align) {
  if(isNull(align)) {
    return this._alignment;
  }

  if (typeof coords === 'function') {
    // something will go here
  } else {
    this._alignment = Object.assign({}, this._alignment, align);
  }

  return this;
}

export function align(position) {
  if(isNull(position)) {
    return this._alignment?.horizontal || this.defaultAlignment.horizontal;
  }
  let horizontal = 'start';
  switch (position) {
    case 'end':
      horizontal = 'end'
    break;
    case 'center':
    case 'middle':
      horizontal = 'middle'
    break;
    case 'start':
    default:
      horizontal = 'start'
  }
  return alignment.call(this, {horizontal})
}

export function valign(position) {
  if(isNull(position)) {
    return this._alignment?.vertical || this.defaultAlignment.vertical;
  }
  let vertical = 'top';
  switch (position) {
    case 'bottom':
      vertical = 'bottom'
    break;
    case 'middle':
    case 'center':
      vertical = 'middle'
    break;
    case 'top':
    default:
      vertical = 'top'
  }
  return alignment.call(this, {vertical})
}
