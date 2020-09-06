import { DEFAULT_WIDTH, TICKS_DEFAULT } from '~/constants';
import { isNull } from '~/helpers';
import { memoize } from '~/util';
//import Heckbert from './util/Heckbert';
import ExtendedWilkinson from './util/ExtendedWilkinson';

export default function scale(name, domain, range = [0, DEFAULT_WIDTH]) {
  let _ticks = [];
  // console.log('rrrrange', range)
  range[0] += name === 'x' ? this._padding.left : -this._padding.bottom;
  range[1] -= name === 'x' ? this._padding.right : -this._padding.top;
  // console.log(name,'RANGE',range)

  const currentDomain = (this.scales[name] && !this.scales[name].isLog())? this.scales[name].domain : [];
  let domainExtent = domain || currentDomain;
  // console.log('DOMAIN EXTENT', name, domainExtent, domain, this.scales[name])
  if (arguments.length === 1) {
    return this.scales[arguments[0]];
  }

  // if no domain defined or new domain is different from current domain
  // calculate the new domain based on all the data
  if(!domainExtent.length || (domainExtent[0] !== currentDomain[0] || domainExtent[1] !== currentDomain[1])) {
    this._data.forEach(d => {
      // console.log(name, domainExtent[0],d[name],domainExtent[1])
      domainExtent[0] =
        domainExtent[0] == null ? d[name] : Math.min(d[name], domainExtent[0]);
      domainExtent[1] =
        domainExtent[1] == null ? d[name] : Math.max(d[name], domainExtent[1]);
    });
  }
  // console.log('NEED TO CHECK FOR objects', this.objects)
  this.objects.forEach(obj => {
    // console.log('setting domain', obj.id())
    if (obj._data) {
      obj._data.forEach(d => {
        domainExtent[0] =
          domainExtent[0] == null
            ? d[obj.fields[name]]
            : Math.min(d[obj.fields[name]], domainExtent[0]);
        domainExtent[1] =
          domainExtent[1] == null
            ? d[obj.fields[name]]
            : Math.max(d[obj.fields[name]], domainExtent[1]);
      });
    }
  });

  //// console.log('DOMAIN', name, domainExtent)

  // const numScale = new Heckbert(domainExtent);
  const eNumScale = new ExtendedWilkinson(domainExtent);
  // console.log('E WILK', eNumScale.ticks())
  // re-assign domain based on, max/min of heckbert nice scale
  //// console.log(domainExtent[0],domainExtent[1],'after WILKINSON', eNumScale.getMin(), eNumScale.getMax())
  domainExtent[0] = eNumScale.getMin();
  domainExtent[1] = eNumScale.getMax();

  const domainWidth = domainExtent[1] - domainExtent[0];
  const direction = range[1] >= range[0] ? 1 : -1;
  const rangeWidth =
    range[1] -
    range[0] -
    (name === 'x'
      ? this._margins.left + this._margins.right
      : this._margins.top + this._margins.bottom) *
      direction;

  const startCoord =
    range[0] +
    (name === 'x' ? this._margins.left : this._margins.bottom) * direction;

  // console.log('new this.scalingFunction', domainExtent, range, rangeWidth)
  const scalingFunction = d => {
    const valueToDomain = (d - domainExtent[0]) / domainWidth;
    return startCoord + rangeWidth * valueToDomain;
  };

  const ticks = (n = TICKS_DEFAULT) => {
    // console.log('LINEAR SCALE', 'ticks', n)
    if (isNull(n) && _ticks.length > 0) {
      return _ticks;
    }
    _ticks = eNumScale.ticks(n).map((value, index) => ({
      index,
      value,
      x: scalingFunction(value),
      isMinor: index % 2
    }));

    return _ticks;
  };

  const getName = () => {
    return name;
  };
  const getTransformation = () => {
    return 'linear';
  };

  scalingFunction.getName = getName;
  scalingFunction.getTransformation = getTransformation;
  scalingFunction.isLog = () => false;
  scalingFunction.domain = domainExtent;
  scalingFunction.range = range;
  scalingFunction.step = eNumScale.getStep();
  scalingFunction.barwidth = scalingFunction(domainExtent[0] + scalingFunction.step) - scalingFunction(domainExtent[0]);

  scalingFunction.ticks = memoize(ticks);
  this.scales[name] = scalingFunction;
  return this;
}
