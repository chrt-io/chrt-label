import * as chrt from 'chrt';
import chrtLabels from '~/chrtLabels'

const data = [
  {
    x: 'a',
    y: 10
  },
  {
    x: 'b',
    y: 14
  },
  {
    x: 'c',
    y: 14
  },
  {
    x: 'd',
    y: 22
  }
];

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .x({scale:'ordinal'})
    .y({domain:[0,null], scale:'linear'})
    // .y({domain:[1,10000], scale:'log'})
    .add(chrt.yAxis())
    .add(
      chrt.chrtStack()
        // .add(
        //   chrt.chrtColumns()
        //     .data(data, d => ({
        //       x: d.x,
        //       y: d.y,
        //     }))
        //     .width(1)
        //     .fill('#f00')
        // )
        .add(
          chrt.chrtColumns()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .width(0.5)
            .fill('#0f0')
            .fillOpacity(0.5)
            .add(
              chrtLabels()
                .valign('middle')
            )
        )
        .add(
          chrt.chrtColumns()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .width(0.5)
            .fill('#00f')
        )
        .add(
          chrt.chrtColumns()
            .data(data, d => ({
              x: d.x,
              y: -d.y,
            }))
            .width(0.5)
            .fill('#0ff')
            .add(
              chrtLabels()
                .valign('middle')
            )
        )
    )
    .add(chrt.xAxis().zero(0))
}
