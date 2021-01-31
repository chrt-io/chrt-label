import { chrtGeneric } from 'chrt-core';
import { isNull } from '~/helpers';
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
import { createSVG as create } from '~/layout';

const DEFAULT_FILL_COLOR = '#000';

function chrtLabel(text) {
  chrtGeneric.call(this);
  // console.log('chrtLabel', this);
  this.type = 'label';
  this.g = null;
  this.text = text;
  this._fill = null;
  this._position = {};
  this._alignment = {
    horizontal: 'start',
    vertical: '0.25em',
  }
  this._margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
  this._offsets = [0,0];

  this.draw = () => {
    if (!this.parentNode.parentNode.scales) {
      return this.parentNode.parentNode;
    }

    if (!this.g) {
      this.g = create('g');
      this.parentNode.g.appendChild(this.g);
    }


    const { scales, _css } = this.parentNode.parentNode;

    // console.log('chrtLabel parent', this.parentNode.parentNode)

    if(!isNull(_css)) {
      this.g.classList.remove('chrt-label');
      this.g.classList.add('chrt-label');
    }

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
      const x = scales.x[this.parentNode.scales.x](getPosition(this._position)(this.parentNode.fields.x)) + this._margins.left - this._margins.right + this._offsets[0];
      // console.log('x', x, this._margins)
      // if y is not defined by the user, it should be calculated based on the closest Y value based on X
      const y = scales.y[this.parentNode.scales.y](getPosition(this._position)(this.parentNode.fields.y)) + this._margins.top - this._margins.bottom + this._offsets[1];
      this.g.setAttribute('transform',`translate(${isNaN(x) ? 0 : x},${isNaN(y) ? 0 : y})`)
    }

    let label = this.g.querySelector('text');

    if (!label) {
      label = create('text');
      label.setAttribute('data-id', `label-${this.text}`);
      this.g.appendChild(label);
    }

    label.setAttribute('fill', this._fill || this.parentNode.stroke || DEFAULT_FILL_COLOR)
    label.textContent = this.text;

    label.setAttribute('text-anchor', this._alignment.horizontal)
    label.setAttribute('dy', this._alignment.vertical)
  }
}

chrtLabel.prototype = Object.create(chrtGeneric.prototype);
chrtLabel.prototype.constructor = chrtLabel;
chrtLabel.parent = chrtGeneric.prototype;

chrtLabel.prototype = Object.assign(chrtLabel.prototype, {
  color,
  position,
  top,
  left,
  align,
  valign,
  margins,
  offset,
});

// export default chrtLabel;
export default function(text) {
  return new chrtLabel(text);
}
