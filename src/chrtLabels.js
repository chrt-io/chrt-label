import chrtGeneric from 'chrt-object';
import { isNull } from '~/helpers';
import chrtLabel from './chrtLabel';
import { align, valign, outside, filterLabels, hideLabels, firstLabel, lastLabel, firstAndLastLabels, offset } from './lib';
import { createSVG as create } from '~/layout';

// const DEFAULT_RADIUS = 2;
// const DEFAULT_FILL_COLOR = '#000';
// const DEFAULT_STROKE = '#000';
// const DEFAULT_STROKE_OPACITY = 1;
// const DEFAULT_STROKE_WIDTH = 1;
// const DEFAULT_FILL_OPACITY = 1;

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

  this._offsets = [() => 0, () => 0];

  this.value = (field) => {
    return this.attr('textField', field);
  }

  this.position = (position) => {
    return this.attr('position', position);
  }

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

    data.forEach((label, i) => {
      if(this.labelsFilter && !this.labelsFilter(label,i, data)) {
        return;
      }
      // console.log(this._alignment.horizontal, label);
      // console.log(this.parentNode.fields.x0)
      // console.log(this.parentNode.getXScale())
      let top = label[this.parentNode.fields.y];
      let x0 = !isNull(label[this.parentNode.fields.x0])
        ? label[this.parentNode.fields.x0]
        : this.parentNode.getXScale().domain[0];
      let left = x0;
      switch (this._alignment.horizontal) {
        case 'start':
          break;
        case 'end':
          left = label[this.parentNode.fields.x] + x0;
        break;
        case 'center':
        case 'middle':
          left = (label[this.parentNode.fields.x] + x0) / 2;
          break;
      }
      left = isBars ? left : label[this.parentNode.fields.x];
      const offsets = {
        top: () => {
          switch (this._vposition) {
            case 'top':
              return isBars ? -(this.parentNode.barWidth() || 0) / 2 : 0;
            case 'bottom':
              return isBars ? (this.parentNode.barWidth() || 0) / 2 : 0;
            case 'center':
            case 'middle':
              return 0;
          }
        },
        left: () => 0,
      };

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
        .offset((offsets.top() ?? 0) + this._offsets[0](), (offsets.left() ?? 0) + this._offsets[1]())
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
  offsets: offset
});

export default function () {
  return new chrtLabels();
}
