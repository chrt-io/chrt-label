import chrtObject, { utils, cssDisplay } from 'chrt-object';
import {
  color,
  position,
  top,
  left,
  align,
  valign,
  margins,
  offset,
} from './lib';
import { DEFAULT_FILL_COLOR } from './constants';
const { isNull, isInfinity, createSVG: create } = utils;

function chrtLabel(text) {
  chrtObject.call(this);
  // console.log('chrtLabel', this);
  this.type = 'label';
  this.g = null;

  this.attr('fill', null);
  this.attr('text', null);

  this.attr('position', {});
  this.attr('anchor', null);

  this.defaultAlignment = {
    horizontal: 'start',
    vertical: 'text-after-edge',
  };

  this._margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  this._offsets = [() => 0, () => 0];
  this._classNames = ['chrt-label'];

  this.value = (text) => {
    return this.attr('text', text);
  };
  this.text = this.value;

  this.value(text);

  this.anchor = (anchor) => {
    return this.attr('anchor', anchor);
  };

  this.draw = () => {
    // console.log('LABEL DRAWING', text, this.g, this);
    const parentNode =
      this?.parentNode?.type === 'chrt'
        ? this.parentNode
        : this?.parentNode?.parentNode;
    // if (!parentNode.scales) {
    //   return parentNode;
    // }

    if (!this.g) {
      this.g = create('g');
      //this.parentNode.g.parentNode.appendChild(this.g);
      parentNode?.currentNode?.appendChild(this.g);
    }
    this.g.setAttribute('id', this.id());

    cssDisplay.call(this, this.attr('display')());
    this.g.classList.remove(...this.g.classList);
    this.g.classList.add(...this._classNames);

    const getPosition = (position) => (field) => {
      if (isNull(position[field])) {
        if (!isNull(this.parentNode._data) && this.parentNode._data.length) {
          // console.log('--->', this.parentNode._data)
          return this.parentNode._data[this.parentNode._data.length - 1][field];
        } else {
          return 0;
        }
      }
      return position[field];
    };

    const anchor = this.attr('anchor')();

    const { scales } = this.parentNode?.parentNode ?? this.parentNode;

    const fields = this.parentNode.fields ?? {
      x: 'x',
      y: 'y',
    };

    if (!anchor && scales && scales.x[fields.x]) {
      // console.log('position', this.attr('position')());
      // console.log(`getPosition(position)(${(this.parentNode.fields.x)})`, getPosition(this.attr('position')())(this.parentNode.fields.x))
      const x =
        scales.x[fields.x](getPosition(this.attr('position')())(fields.x)) +
        this._margins.left -
        this._margins.right +
        this._offsets[1]();
      // console.log('x', x, this._margins)
      // if y is not defined by the user, it should be calculated based on the closest Y value based on X
      const y =
        scales.y[fields.y](getPosition(this.attr('position')())(fields.y)) +
        this._margins.top -
        this._margins.bottom +
        this._offsets[0]();
      this.g.setAttribute(
        'transform',
        `translate(${isNaN(x) || isInfinity(x) ? 0 : x},${isNaN(y) || isInfinity(y) ? 0 : y})`,
      );

      // console.log('drawing label', this._offsets[0](), this._offsets[1]())
    }

    let label = this.g.querySelector('text');

    if (!label) {
      label = create('text');
      const text = this.attr('text')();
      label.setAttribute('data-id', escape(`label-${text}`));
      this.g.appendChild(label);
    }
    label.setAttribute(
      'fill',
      this.color()() || this.parentNode?.stroke?.()() || DEFAULT_FILL_COLOR,
    );
    label.textContent = this.attr('text')();

    // console.log(this._alignment, anchor?.alignment, this.defaultAlignment)

    const alignment =
      this._alignment || anchor?.alignment || this.defaultAlignment;

    // console.log('ALIGNMENT', alignment)

    let textAnchor = alignment.horizontal;

    let dominantAlignment = '';
    switch (alignment.vertical) {
      case 'bottom':
        dominantAlignment = 'text-before-edge';
        break;
      case 'top':
        dominantAlignment = 'text-after-edge';
        break;
      default:
      case 'middle':
        dominantAlignment = 'middle';
    }

    // anchor is used by chrtLabels to anchor labels to points
    if (anchor) {
      // console.log('anchor', anchor);
      // console.log('this._alignment', this._alignment);

      const relativePosition = anchor.relativePosition;

      const _x =
        anchor.x +
        anchor.width * (1 - anchor.directions.x) +
        anchor.width * relativePosition[0] * (anchor.directions.x || -1); // + (anchor.width * anchor.directions.x) * relativePosition[0];
      // const _y = anchor.y + (anchor.height * relativePosition[1]);
      const _y =
        anchor.y +
        anchor.height * (1 - anchor.directions.y) +
        anchor.height * relativePosition[1] * (anchor.directions.y || -1);
      const translate = {
        x: (isNaN(_x) || isInfinity(_x) ? 0 : _x) + this._offsets[1](),
        y: (isNaN(_y) || isInfinity(_y) ? 0 : _y) + this._offsets[0](),
      };

      if (!anchor.directions.x) {
        if (textAnchor === 'start') {
          textAnchor = 'end';
        } else if (textAnchor === 'end') {
          textAnchor = 'start';
        }
      }

      if (!anchor.directions.y) {
        if (dominantAlignment === 'text-after-edge') {
          dominantAlignment = 'text-before-edge';
        } else if (dominantAlignment === 'text-before-edge') {
          dominantAlignment = 'text-after-edge';
        }
      }

      this.g.setAttribute(
        'transform',
        `translate(${translate.x}, ${translate.y})`,
      );
    }
    label.setAttribute('text-anchor', textAnchor);
    label.setAttribute('dominant-baseline', dominantAlignment);

    return this;
  };
}

chrtLabel.prototype = Object.create(chrtObject.prototype);
// console.log('WHAT IS THIS?')
// console.log(Object.create(chrtObject.prototype))
chrtLabel.prototype.constructor = chrtLabel;
// chrtLabel.parent = chrtObject.prototype;

chrtLabel.prototype = Object.assign(chrtLabel.prototype, {
  color,
  fill: color,
  position,
  top,
  left,
  align,
  valign,
  margins,
  offset,
  offsets: offset,
});

// export default chrtLabel;
export default function (text) {
  return new chrtLabel(text);
}
