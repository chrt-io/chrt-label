import { utils } from 'chrt-object';
const { isNull } = utils;

export default function relativePosition(position) {
  if(isNull(position)) {
    return this._rposition;
  }
  // let [leftPosition, topPosition] = position;
  // let top = this._rposition[1];
  // if(!isNull(topPosition)) {
  //   top = typeof topPosition === 'function' ? topPosition : () => topPosition;
  // }
  //
  // let left = this._rposition[0];
  // if(!isNull(leftPosition)) {
  //   left = typeof leftPosition === 'function' ? leftPosition : () => leftPosition;
  // }

  this._rposition = position; // [leftPosition || 0, topPosition || 0];

  return this;
}
