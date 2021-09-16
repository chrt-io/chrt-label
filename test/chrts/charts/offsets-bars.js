import * as chrt from 'chrt';
import chrtLabels from '~/chrtLabels'

const data = new Array(5).fill(1).map((d,i) => ({x: i, y: i}));

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis(5))
    .add(chrt.yAxis())
    .add(
      chrt.chrtBars()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
        .add(
          chrtLabels()
            .valign('middle')
            .align('start')
            .offset(-50,10)
        )
    );
}
