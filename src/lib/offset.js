import { utils } from 'chrt-object';
const { isNull } = utils;

export default function offset(...offsets) {
  if(isNull(offsets)) {
    return this._offsets;
  }
  let [leftOffset, topOffset] = offsets;
  let top = this._offsets[0];
  if(!isNull(topOffset)) {
    top = typeof topOffset === 'function' ? topOffset : () => topOffset;
  }

  let left = this._offsets[1];
  if(!isNull(leftOffset)) {
    left = typeof leftOffset === 'function' ? leftOffset : () => leftOffset;
  }

  this._offsets = [top, left];

  return this;
}
