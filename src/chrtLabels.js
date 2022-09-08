import chrtObject, { utils, cssDisplay } from 'chrt-object';
const { isNull } = utils;
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


    // remove old labels
    // console.log('DO I HAVE LABELS', this.labels, data)
    // this.labels.forEach(label => {
    //   console.log('LABEL', label, label.g, label.id())
    // })
    if(this.labels?.length) {
      const dataLabelsDelta = (this.labels.length - data.length);
      // console.log('dataLabelsDelta', dataLabelsDelta)
      if(dataLabelsDelta > 0) {
        Array.from({length: dataLabelsDelta}, (_, i) => i + data.length).forEach(d => {
          // console.log('REMOVING', d, this.labels[d].node())
          this.labels[d]?.remove();
          this.labels[d] = null;
        })
        this.labels = this.labels.filter(d => d)
      }
    }


    data.forEach((label, i) => {
      if(this.labelsFilter && !this.labelsFilter(label,i, data)) {
        return;
      }

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

      if (!this.labels[i]) {
        this.labels[i] = chrtLabel();
        // console.log('adding label',i,'with value',textField,'to',this.parentNode)
        this.parentNode.add(this.labels[i]);
      }

      // console.log('now we I have', this.labels.length, 'labels')

      const textFieldAccessor = this.attr('textField')(label,i,this.labels);
      //console.log('textFieldAccessor', textFieldAccessor)
      const textField = !isNull(textFieldAccessor) ? textFieldAccessor : label[this.parentNode.fields.y];
      // console.log('ITS VALUE WILL BE', textField)
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
        .color(this.color()(label,i,data))

      if(this._alignment) {
        this.labels[i]
          .align(this._alignment?.horizontal || 'middle')
          .valign(this._alignment?.vertical || 'top');
      }

      this.labels[i].attr(this.attr('display')(label,i,data));

      this.labels[i].draw();

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
