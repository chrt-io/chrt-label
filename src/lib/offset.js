import { isNull } from '~/helpers';

export default function offset(...offsets) {
  if(isNull(offsets)) {
    return this._offsets;
  }
  const [top, left] = offsets;
  this._offsets[0] = !isNull(top) ? top  : this._offsets[0];
  this._offsets[1] = !isNull(left) ? left  : this._offsets[1];


  return this;
}
