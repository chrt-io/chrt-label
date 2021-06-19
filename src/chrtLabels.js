import chrtGeneric from 'chrt-object';
import { isNull } from '~/helpers';
import chrtLabel from './chrtLabel';
import { align, valign, outside, filterLabels, hideLabels, firstLabel, lastLabel, firstAndLastLabels, offset, color } from './lib';
import { createSVG as create } from '~/layout';
import {
  DEFAULT_FILL_COLOR
} from './constants';

function chrtLabels() {
  chrtGeneric.call(this);
  // console.log("HI WE ARE LABELS", this);
  this.type = 'labels';
  this.labels = [];
  this.g = null;
  this.labelsFilter = () => true;
  this._alignment = {
    horizontal: 'end',
    vertical: 'middle',
  };
  this._hposition = 'middle';
  this._vposition = 'top';
  this.attr('fill', DEFAULT_FILL_COLOR);

  this._offsets = [() => null, () => null];

  this.value = (field) => {
    return this.attr('textField', field);
  }

  // this.position = (position) => {
  //   return this.attr('position', position);
  // }

  this.draw = () => {
    const parentData = this.parentNode.data();
    const data = parentData.length
      ? parentData
      : this.parentNode.parentNode._data || [];

    if (!this.g) {
      this.g = create('g');
      this.parentNode.g.appendChild(this.g);
    }
    const isBars = this.parentNode.constructor.name === 'chrtBars';
    const isColumns = this.parentNode.constructor.name === 'chrtColumns';

    data.forEach((label, i) => {
      if(this.labelsFilter && !this.labelsFilter(label,i, data)) {
        return;
      }

      let top = label[this._vposition === 'base' ? this.parentNode.fields.y0 : this.parentNode.fields.y] || 0;
      let x0 = !isNull(label[this.parentNode.fields.x0])
        ? label[this.parentNode.fields.x0]
        : this.parentNode.getXScale().domain[0];
      const x = label[this.parentNode.fields.x];
      let left = isBars ? x0 : x;

      // console.log(this.parentNode)
      switch (this._alignment.horizontal) {
        case 'base':
        break;
        case 'start':
          left = isBars ? (x + x0) : x;
        break;
        case 'end':
          left = isBars ? (x + x0) : x;
        break;
        case 'center':
        case 'middle':
          left = isBars ? (label[this.parentNode.fields.x] + x0) / 2 : x;
          break;
      }
      //console.log(this._alignment.horizontal, this._hposition, left)
      // left = isBars ? left : label[this.parentNode.fields.x];
      const offsets = {
        top: () => {
          switch (this._vposition) {
            case 'base':
            case 'top':
              return isBars ? -(this.parentNode.barWidth() || 0) / 2 : -5;
            case 'bottom':
              return isBars ? (this.parentNode.barWidth() || 0) / 2 : 5;
            case 'center':
            case 'middle':
            default:
              return 0;
          }
        },
        left: () => {
          const delta = isColumns ? this.parentNode.getXScale().barwidth/2 : 0;
          switch (this._hposition) {
            case 'base':
              return isBars ? 5 : 0;
            case 'start':
            case 'left':
              return isBars ? 5 :  -delta;
            case 'end':
            case 'right':
              return isBars ? -5 :  delta;
            default:
              return 0;
          }
        },
      };
      // console.log(offsets.left())
      if (!this.labels[i]) {
        // if the marker exists, just update its data
        // this.markers[i].marker = marker;

        this.labels[i] = chrtLabel();
        this.parentNode.add(this.labels[i]);
      }

      const textFieldAccessor = this.attr('textField');
      const textField = !isNull(textFieldAccessor) ? textFieldAccessor(label) : label[this.parentNode.fields.y];
      // console.log('LABELS CLASS', this.class().join(' '), this.class());
      const classNames = this.class();
      if(classNames.length) {
        this.labels[i].class(classNames.join(' '));
      }

      this.labels[i]
        .value(textField)
        .top(top)
        .left(left)
        .align(this._hposition)
        .valign(this._vposition)
        .offset(
          ((this._offsets[0]() ?? 0) + offsets.top()),
          ((this._offsets[1]() ?? 0) + offsets.left())
        )
        .color(this.color()())
        .outside(this.outside());
    });

    return this.parentNode;
  };
}

chrtLabels.prototype = Object.create(chrtGeneric.prototype);
chrtLabels.prototype.constructor = chrtLabels;
chrtLabels.parent = chrtGeneric.prototype;

chrtLabels.prototype = Object.assign(chrtLabels.prototype, {
  align,
  valign,
  outside,
  filter:filterLabels,
  show: filterLabels,
  hide: hideLabels,
  filterLabels,
  hideLabels,
  firstLabel,
  lastLabel,
  firstAndLastLabels,
  offset,
  offsets: offset,
  color,
});

export default function () {
  return new chrtLabels();
}
