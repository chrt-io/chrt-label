import { utils } from "chrt-object";
const { isNull } = utils;

export function getHorizontalPosition(position) {
  if (typeof position === "function") {
    return position;
  }
  let horizontal = "start";
  switch (position) {
    case "end":
      horizontal = "end";
      break;
    case "center":
    case "middle":
      horizontal = "middle";
      break;
    case "start":
    default:
      horizontal = "start";
  }
  return () => horizontal;
}

export function getVerticalPosition(position) {
  if (typeof position === "function") {
    return position;
  }
  let vertical = "top";
  switch (position) {
    case "bottom":
      vertical = "bottom";
      break;
    case "middle":
    case "center":
      vertical = "middle";
      break;
    case "top":
    default:
      vertical = "top";
  }
  return () => vertical;
}

export default function alignment(align) {
  // this is never called
  // if(isNull(align)) {
  //   return this._alignment;
  // }
  // console.log("alignment", align);
  // if (typeof align === "function") {
  //   this._alignment = Object.assign({}, this._alignment, align);
  // } else {
  //   this._alignment = Object.assign({}, this._alignment, align);
  // }
  this._alignment = Object.assign({}, this._alignment, align);
  return this;
}

export function align(position) {
  if (isNull(position)) {
    return this._alignment?.horizontal || this.defaultAlignment.horizontal;
  }

  // return alignment.call(this, { horizontal: getHorizontalPosition(position) });
  return alignment.call(this, { horizontal: getHorizontalPosition(position) });
}

export function valign(position) {
  if (isNull(position)) {
    return this._alignment?.vertical || this.defaultAlignment.vertical;
  }

  return alignment.call(this, { vertical: getVerticalPosition(position) });
}
