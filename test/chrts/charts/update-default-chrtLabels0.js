import * as chrt from 'chrt';
// import Chrt from 'chrt-core';
// import { xAxis, yAxis } from 'chrt-axis';
// import { chrtPoints } from  'chrt-points';
import chrtLabels from '../../../src/chrtLabels';

const data = new Array(10).fill(1).map((d, i) => ({ x: i, y: i }));

const data2 = new Array(5).fill(1).map((d, i) => ({ x: i, y: i }));

export default async function (container) {
  const points = chrt
    .chrtPoints()
    .data(data, (d) => ({
      x: d.x,
      y: d.y,
    }))
    .radius(5)
    .add(chrtLabels());

  const chart = chrt
    .Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis())
    .add(chrt.yAxis())
    .add(points);

  points.data(data2, (d) => ({
    x: d.x,
    y: d.y,
  }));

  chart.update();
  return chart;
}
