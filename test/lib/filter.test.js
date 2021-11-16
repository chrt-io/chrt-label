import chrtLabels from '~/chrtLabels'

describe('Testing show', () => {

  it('Filter is a function', () => {
    const chartLabels = new chrtLabels();

    // defauly labelsFilter always return true
    expect(chartLabels.labelsFilter(10,1)).toEqual(true);

    const filter = (d,i) => !(i % 2);

    chartLabels.show(filter);

    expect(chartLabels.labelsFilter(10,0)).toEqual(true);
    expect(chartLabels.labelsFilter(10,1)).toEqual(false);

  })

  it('Filter is a boolean', () => {
    const chartLabels = new chrtLabels();

    // defauly labelsFilter always return true
    expect(chartLabels.labelsFilter(10,1)).toEqual(true);

    chartLabels.show(false);

    expect(chartLabels.labelsFilter(10,0)).toEqual(false);
    expect(chartLabels.labelsFilter(10,1)).toEqual(false);

  })

  it('Filter is a finite', () => {
    const chartLabels = new chrtLabels();

    // defauly labelsFilter always return true
    expect(chartLabels.labelsFilter(10,1)).toEqual(true);

    chartLabels.show(10);

    expect(chartLabels.labelsFilter(10)).toEqual(true);
    expect(chartLabels.labelsFilter(11)).toEqual(false);
    expect(chartLabels.labelsFilter(Infinity)).toEqual(false);
  })



  it('Filter is an array', () => {
    const chartLabels = new chrtLabels();

    // defauly labelsFilter always return true
    expect(chartLabels.labelsFilter(10,1)).toEqual(true);

    chartLabels.show([10, 20, 30])

    expect(chartLabels.labelsFilter(20)).toEqual(true);
    expect(chartLabels.labelsFilter(15)).toEqual(false);

  })

  it('Filter is a null', () => {
    const chartLabels = new chrtLabels();

    // defauly labelsFilter always return true
    expect(chartLabels.labelsFilter(null)).toEqual(true);

    chartLabels.show(null);

    expect(chartLabels.labelsFilter(null,0)).toEqual(true);
    expect(chartLabels.labelsFilter(10,1)).toEqual(false);

  })

})

it('Testing hide', () => {

  const chartLabels = new chrtLabels();

  // defauly labelsFilter always return true
  expect(chartLabels.labelsFilter(10,1)).toEqual(true);

  chartLabels.hide();

  expect(chartLabels.labelsFilter(10,1)).toEqual(false);
})

describe('Testing position labels', () => {
  it('Testing firstLabel', () => {
    const chartLabels = new chrtLabels();

    // defauly labelsFilter always return true
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(true);

    chartLabels.firstLabel();

    expect(chartLabels.labelsFilter(0,0,[0,5,10])).toEqual(true);
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(false);

    chartLabels.firstLabel(false);

    expect(chartLabels.labelsFilter(0,0,[0,5,10])).toEqual(false);
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(true);
  })

  it('Testing lastLabel', () => {
    const chartLabels = new chrtLabels();

    // defauly labelsFilter always return true
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(true);

    chartLabels.lastLabel();

    expect(chartLabels.labelsFilter(10,2,[0,5,10])).toEqual(true);
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(false);

    chartLabels.lastLabel(false);

    expect(chartLabels.labelsFilter(10,2,[0,5,10])).toEqual(false);
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(true);
  })

  it('Testing firstAndlastLabel', () => {
    const chartLabels = new chrtLabels();

    // defauly labelsFilter always return true
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(true);

    chartLabels.firstAndLastLabels();

    expect(chartLabels.labelsFilter(0,0,[0,5,10])).toEqual(true);
    expect(chartLabels.labelsFilter(10,2,[0,5,10])).toEqual(true);
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(false);

    chartLabels.firstAndLastLabels(false);

    expect(chartLabels.labelsFilter(0,0,[0,5,10])).toEqual(false);
    expect(chartLabels.labelsFilter(10,2,[0,5,10])).toEqual(false);
    expect(chartLabels.labelsFilter(5,1,[0,5,10])).toEqual(true);
  })
})
