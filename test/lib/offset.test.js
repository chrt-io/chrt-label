import chrtLabel from '~/chrtLabel';

const defaultOffset = [() => 0, () => 0];

describe('Testing offset', () => {
  it('Default offset', () => {
    const chartLabel = new chrtLabel('test');
    expect(chartLabel.offset().map((d) => d())).toEqual(
      defaultOffset.map((d) => d()),
    );
  });

  it('Setting offset', () => {
    const chartLabel = new chrtLabel('test');

    const newOffset = [10, 10];

    chartLabel.offset(...newOffset);

    // chartLabel.offset().forEach((d, i) => console.log(i, d()));
    expect(chartLabel.offset().map((d) => d())).toEqual(newOffset);
  });
});
