import * as chrt from 'chrt';
import chrtLabels from '~/chrtLabels'

const data = new Array(10).fill(1).map((d,i) => ({x: i, y: i}));

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis())
    .add(chrt.yAxis())
    .add(
      chrt.chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
        .radius(5)
        .add(
          chrtLabels()
            .value(d => {
              return `x:${d.x} y:${d.y}`;
            })
            // .valign('top')
            // .align('left')
            // .valign('bottom')
            // .align('right')
            // .valign('center')
            // .align('center')
            // .valign('base')
            // .align('base')
        )
    );
}
