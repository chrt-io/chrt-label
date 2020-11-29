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
      vertical = '-0.7em'
    break;
    case 'bottom':
      vertical = '1em'
    break;
    default:
      vertical = '0.25em'
  }
  return alignment.call(this, {vertical})
}

export function align(position) {
  if(isNull(position)) {
    return this._alignment.horizontal;
  }
  let horizontal = this._alignment.horizontal;
  switch (position) {
    case 'right':
      horizontal = 'end'
    break;
    case 'center':
      horizontal = 'middle'
    break;
    default:
      horizontal = 'start'
  }
  return alignment.call(this, {horizontal})
}
