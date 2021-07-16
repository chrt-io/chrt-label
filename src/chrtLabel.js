import chrtGeneric from 'chrt-object';
import { isNull, isInfinity } from '~/helpers';
import {
  color,
  position,
  top,
  left,
  align,
  valign,
  margins,
  offset,
  outside,
} from './lib';
import {
  DEFAULT_FILL_COLOR
} from './constants';
import { createSVG as create } from '~/layout';

function chrtLabel(text) {
  chrtGeneric.call(this);
  // console.log('chrtLabel', this);
  this.type = 'label';
  this.g = null;

  this.attr('fill', null);
  this.attr('text', null)

  this.attr('position', {})
  this._alignment = {
    horizontal: 'start',
    vertical: '0.25em',
  }
  this._vposition = 'middle';
  this._hposition = 'start';
  this._margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
  this._offsets = [() => 0, () => 0];
  this._classNames = ['chrt-label'];

  this.value = (text) => {
    return this.attr('text', text);
  }

  this.value(text);

  this.draw = () => {
    if (!this.parentNode.parentNode.scales) {
      return this.parentNode.parentNode;
    }

    if (!this.g) {
      this.g = create('g');
      this.parentNode.g.appendChild(this.g);
    }
    this.g.setAttribute('id', this.id())

    const { scales } = this.parentNode.parentNode;
    this._classNames.forEach(d => this.g.classList.add(d));

    const getPosition = position => (field) => {
      // console.log('getPosition', position, field)
      if(isNull(position[field])) {
        if(!isNull(this.parentNode._data) && this.parentNode._data.length) {
          // console.log('--->', this.parentNode._data)
          return this.parentNode._data[this.parentNode._data.length - 1][field];
        } else {
          return 0;
        }
      }
      return position[field];
    };

    if(scales && scales.x[this.parentNode.scales.x]) {
      const x = scales.x[this.parentNode.scales.x](getPosition(this.attr('position')())(this.parentNode.fields.x)) + this._margins.left - this._margins.right + this._offsets[1]();
      // console.log('x', x, this._margins)
      // if y is not defined by the user, it should be calculated based on the closest Y value based on X
      const y = scales.y[this.parentNode.scales.y](getPosition(this.attr('position')())(this.parentNode.fields.y)) + this._margins.top - this._margins.bottom + this._offsets[0]();
      this.g.setAttribute('transform',`translate(${isNaN(x) || isInfinity(x) ? 0 : x},${isNaN(y) || isInfinity(y) ? 0 : y})`)

      // console.log('drawing label', this._offsets[0](), this._offsets[1]())
    }

    let label = this.g.querySelector('text');

    if (!label) {
      label = create('text');
      const text = this.attr('text')();
      label.setAttribute('data-id', `label-${text}`);
      this.g.appendChild(label);
    }

    label.setAttribute('fill', this.color()() || this.parentNode.stroke()() || DEFAULT_FILL_COLOR)
    label.textContent = this.attr('text')();

    let textAnchor = this._alignment.horizontal;
    if(this.outside() && this.outside()()) {
      textAnchor = textAnchor === 'start' ? 'end' : 'start';
    }

    label.setAttribute('text-anchor', textAnchor)
    label.setAttribute('dy', this._alignment.vertical)

    // console.log('---->', chrtGeneric.prototype)
    // console.log('--->', chrtGeneric.hasData.call(this))

    return this;
  }
}

chrtLabel.prototype = Object.create(chrtGeneric.prototype);
// console.log('WHAT IS THIS?')
// console.log(Object.create(chrtGeneric.prototype))
chrtLabel.prototype.constructor = chrtLabel;
// chrtLabel.parent = chrtGeneric.prototype;

chrtLabel.prototype = Object.assign(chrtLabel.prototype, {
  color,
  position,
  top,
  left,
  align,
  valign,
  margins,
  offset,
  offsets: offset,
  outside,
});

// export default chrtLabel;
export default function(text) {
  return new chrtLabel(text);
}
