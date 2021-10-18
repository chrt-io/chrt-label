import chrtObject from 'chrt-object';
import { isNull } from './helpers';
import chrtLabel from './chrtLabel';
import { align, valign, filterLabels, hideLabels, firstLabel, lastLabel, firstAndLastLabels, offset, color, relativePosition } from './lib';
import {
  DEFAULT_FILL_COLOR
} from './constants';

function chrtLabels() {
  chrtObject.call(this);
  // console.log("HI WE ARE LABELS", this);
  this.type = 'labels';
  this.labels = [];
  // this.g = null;
  this.labelsFilter = () => true;
  this._alignment = null;
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

    // if (!this.g) {
    //   this.g = create('g');
    //   this.parentNode.g.appendChild(this.g);
    // }
    const isBars = ~this.parentNode?.class().indexOf('chrt-bars');
    const isColumns = ~this.parentNode?.class().indexOf('chrt-columns');

    data.forEach((label, i) => {
      if(this.labelsFilter && !this.labelsFilter(label,i, data)) {
        return;
      }

      // console.log('label', label)

      // let y0 = label[this.parentNode.fields.y0] ?? 0; // this.parentNode.getYScale().domain[0];
      // const y = label[`stacked_${this.parentNode.fields.y}`] ?? label[this.parentNode.fields.y]
      // const top = isColumns ? (y0) : y;
      // switch (this._vposition) {
      //   case 'base':
      //     top = isColumns ? (y0) : y;
      //   break;
      //   case 'start':
      //     top = isColumns ? (y) : y;
      //   break;
      //   case 'end':
      //     top = isColumns ? (y) : y;
      //   break;
      //   case 'bottom':
      //     top = isColumns ? y0 : y;
      //   break;
      //   case 'center': // center alignment of the text in the center of the column
      //     top = isColumns ? (y + y0) / 2 : y;
      //     break;
      //   case 'middle':
      //     top = y;
      //     break;
      // }
      // console.log('----',this._vposition,'----')
      // console.log('isColumns', isColumns)
      // console.log('y',y)
      // console.log('y0',y0)
      // console.log('top',top)

      // let x0 = label[this.parentNode.fields.x0] ?? 0; // this.parentNode.getXScale().domain[0];

      // const x = label[`stacked_${this.parentNode.fields.x}`] ?? label[this.parentNode.fields.x]
      // const left = x; // isBars && x > 0 ? x0 : x;
      // console.log('x0', x0)
      // console.log('x', x)
      // if(isBars && this._hposition === 'base') {
      //   this._hposition = x >= 0 ? 'left' : 'right';
      // }
      //
      // switch (this._hposition) {
      //   // case 'base':
      //   //   left = isBars && x < 0 ? x0 : left;
      //   // break;
      //   case 'left':
      //     left = isBars && x > 0 ? x0 : x;
      //   break;
      //   case 'right':
      //     left = isBars && x < 0 ? x0 : x;
      //   break;
      //   case 'center': // center alignment of the text in the center of the bar
      //     left = isBars ? (x + x0) / 2 : x;
      //     break;
      //   case 'end':
      //   case 'start':
      //   case 'middle': // middle alignment of the text
      //     left = x;
      //     break;
      // }

      // console.log(this._alignment.horizontal, this._hposition, left)
      // left = isBars ? left : label[this.parentNode.fields.x];
      const offsets = {
        top: () => {
          switch (this._vposition) {
            case 'base':
            case 'top':
              return isBars ? -(this.parentNode.barWidth() || 0) / 2 : 0;
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

      const textFieldAccessor = this.attr('textField')(label,i,this.labels);
      // console.log('textFieldAccessor', textFieldAccessor)
      const textField = !isNull(textFieldAccessor) ? textFieldAccessor : label[this.parentNode.fields.y];
      // console.log('LABELS CLASS', this.class().join(' '), this.class());

      const classNames = this.class();
      if(classNames.length) {
        this.labels[i].class(classNames.join(' '));
      }
      // console.log('anchorPoints', label.anchorPoints)
      // console.log('this._rposition', this._rposition)
      // console.log('this._alignment', this._alignment)
      this.labels[i]
        .value(textField)
        // .top(top)
        // .left(left)
        .anchor(label.anchorPoints ? Object.assign({}, label.anchorPoints, {
          relativePosition: this._rposition || label.anchorPoints.relativePosition,
        }) : null)
        .offset(
          ((this._offsets[1]() ?? 0) + offsets.left()),
          ((this._offsets[0]() ?? 0) + offsets.top())
        )
        .color(this.color()(label,i,data));

      if(this._alignment) {
        this.labels[i]
          .align(this._alignment?.horizontal)
          .valign(this._alignment?.vertical);
      }


    });

    return this;
  };
}

chrtLabels.prototype = Object.create(chrtObject.prototype);
chrtLabels.prototype.constructor = chrtLabels;
chrtLabels.parent = chrtObject.prototype;

chrtLabels.prototype = Object.assign(chrtLabels.prototype, {
  align,
  valign,
  relativePosition,
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
  fill: color,
});

export default function () {
  return new chrtLabels();
}
