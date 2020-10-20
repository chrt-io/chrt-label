import { isNull } from '~/helpers';

export default function setMargins({top, bottom, left, right}) {
  this._margins.top = !isNull(top) ? top  : this._margins.top;
  this._margins.bottom = !isNull(bottom) ? bottom  : this._margins.bottom;
  this._margins.left = !isNull(left) ? left  : this._margins.left;
  this._margins.right = !isNull(right) ? right  : this._margins.right;

  return this;
}