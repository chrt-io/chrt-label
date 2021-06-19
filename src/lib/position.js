export default function position(coords) {
  const _position = this.attr('position')();
  return this.attr('position', Object.assign({}, _position, coords));
}

export function top(y) {
  return position.call(this, {y})
}

export function left(x) {
  return position.call(this, {x})
}
