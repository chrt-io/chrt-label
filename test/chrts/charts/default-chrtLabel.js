import * as chrt from 'chrt';
import chrtLabel from '~/chrtLabel'

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
        .add(
          chrtLabel('test')
            .outside(true)
            .position({x: 8, y:8})
            .offset(10,10)
            .align('end')
            .valign('top')
        )
    );
}