import chrtLabel from '~/chrtLabel'

const defaultMargins = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

describe('Testing margins', () => {

  it('Default margins', () => {
    const chartLabel = new chrtLabel('test');

    // defauly labelsFilter always return true
    expect(chartLabel.margins()).toEqual(defaultMargins);
  })

  it('Setting margins', () => {
    const chartLabel = new chrtLabel('test');

    const newMargins = {
      top: 10,
      left: 10,
      bottom: 10,
      right: 10,
    };

    chartLabel.margins(newMargins);
    expect(chartLabel.margins()).toEqual(newMargins);

  })

  it('Setting all null margins', () => {
    const chartLabel = new chrtLabel('test');

    const newMargins = {};

    chartLabel.margins(newMargins);
    expect(chartLabel.margins()).toEqual(defaultMargins);

  })



});
