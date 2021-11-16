import * as chrt from 'chrt';
// import chrtLabels from '../../../src/chrtLabels'

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
          chrt.chrtLabels()
            .value('start-top')
            .align('start')
            .valign('top')
            .relativePosition([1,0])
        )
    );
}
