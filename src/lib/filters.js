import { isNull } from '~/helpers';

// filterLabels and hideLabels can get different type of parameters and they filter the labels based on the parameters
export function filterLabels(filter) {
  // default true
  if (isNull(filter)) {
    this.labelsFilter = () => true;
    return this;
  }

  // filter-in with a function
  // filterLabels((d,i) => !(i % 2))
  if (typeof filter === 'function') {
    this.labelsFilter = (d, i, arr) => filter(d, i, arr);
    return this;
  }

  // show/hide all labels
  // filterLabels(false|true)
  if (typeof filter === 'boolean') {
    this.labelsFilter = () => filter;
    return this;
  }

  // show only one label
  // filterLabels(10)
  if (Number.isFinite(filter)) {
    this.labelsFilter = d => filter === d;
    return this;
  }

  // show based on an array of values
  // filterLabels([10, 20, 30])
  if (Array.isArray(filter)) {
    this.labelsFilter = d => filter.indexOf(d) > -1;
    return this;
  }

  return this;
}

// hideLabels is the opposite of filterLabels and it filters out
export function hideLabels(filter) {
  filterLabels.call(this, filter);
  const labelsFilter = this.labelsFilter;
  this.labelsFilter = (d, i, arr) => !labelsFilter(d, i, arr);

  return this;
}

export function firstLabel(show = true) {
  if(show) {
    filterLabels.call(this, (d,i) => i === 0);
  } else {
    hideLabels.call(this, (d,i) => i === 0);
  }
  return this;
}

export function lastLabel(show = true) {
  if(show) {
    filterLabels.call(this, (d,i,arr) => i === arr.length - 1);
  } else {
    hideLabels.call(this, (d,i,arr) => i === arr.length - 1);
  }

  return this;
}

export function firstAndLastLabels(show = true) {
  if(show) {
    filterLabels.call(this, (d,i,arr) => i === 0 || i === arr.length - 1);
  } else {
    hideLabels.call(this, (d,i,arr) => i === 0 || i === arr.length - 1);
  }

  return this;
}
