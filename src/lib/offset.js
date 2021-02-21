import { isNull } from '~/helpers';

export default function offset(...offsets) {
  if(isNull(offsets)) {
    return this._offsets;
  }
  let [topOffset, leftOffset] = offsets;
  let top = this._offsets[0];
  if(!isNull(topOffset)) {
    top = typeof topOffset === 'function' ? topOffset : () => topOffset;
  }

  let left = this._offsets[1];
  if(!isNull(leftOffset)) {
    left = typeof leftOffset === 'function' ? leftOffset : () => leftOffset;
  }

  this._offsets = [top, left];
  /*
  console.log('!!! offset', top, left)
  if(!isNull(top) && typeof top === 'function') {

  } else {
    console.log('offset.top is not a f')
    top = () => 123;
  }
  if(!isNull(left) && typeof left === 'function') {

  } else {
    left = () => left;
  }
  this._offsets[0] = !isNull(top) ? top  : this._offsets[0];
  this._offsets[1] = !isNull(left) ? left  : this._offsets[1];

  console.log('SO OFFSET', this._offsets)
  */
  return this;
}
