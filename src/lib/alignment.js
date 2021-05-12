import { isNull } from '~/helpers';
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

export function valign(position) {
  if(isNull(position)) {
    return this._alignment.vertical;
  }
  let vertical = this._alignment.vertical;
  switch (position) {
    case 'top':
    case 'base':
      vertical = 0;
    break;
    case 'bottom':
      vertical = '0.7em'
    break;
    case 'middle':
    default:
      vertical = '0.25em'
  }
  this._vposition = position;
  return alignment.call(this, {vertical})
}

export function align(position) {
  if(isNull(position)) {
    return this._alignment.horizontal;
  }
  let horizontal = this._alignment.horizontal;
  switch (position) {
    case 'end':
    case 'right':
      this._alignment.horizontal = 'end';
      horizontal = 'end'
    break;
    case 'middle':
    case 'center':
      this._alignment.horizontal = 'middle';
      horizontal = 'middle'
    break;
    case 'base':
      horizontal = 'base';
      this._alignment.horizontal = 'left';
    break;
    case 'left':
    default:
      horizontal = 'start'
  }
  this._hposition = position;
  return alignment.call(this, {horizontal})
}
