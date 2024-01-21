import * as chrt from 'chrt';
import chrtLabel from '~/chrtLabel';

const height = 200;
describe('Testing nodata', () => {
  const mockElement = document.createElement('div');
  const chart = chrt
    .Chrt()
    .size(600, height)
    .margins({ top: 0, bottom: 0, left: 0, right: 0 })
    .node(mockElement);

  it('Default nodata', () => {
    const chartLabel = new chrtLabel('test');
    chart.add(chartLabel);

    expect(chartLabel.g.getAttribute('transform')).toEqual(
      `translate(0,${height})`,
    );
  });
});
