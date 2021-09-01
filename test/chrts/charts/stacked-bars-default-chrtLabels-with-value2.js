import * as chrt from 'chrt';
import chrtLabels from '~/chrtLabels'

const data = new Array(5).fill(1).map((d,i) => ({x: i, y: i}));

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis())
    .add(chrt.yAxis())

    .add(
      chrt.chrtStack()
        .orientation('left')
        .add(
          chrt.chrtBars()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .fill('#0ff')
            .add(
              chrtLabels()
                .value(d => {
                  return `x:${d.x} y:${d.y}`;
                })
                .valign('middle')
                .align('end')
            )
        )
        .add(
          chrt.chrtBars()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .add(
              chrtLabels()
                .value(d => {
                  return `x:${d.x} y:${d.y}`;
                })
                .valign('middle')
                .align('middle')
            )
        )
        .add(
          chrt.chrtBars()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .fill('#ff0')
            .add(
              chrtLabels()
                .value(d => {
                  return `x:${d.x} y:${d.y}`;
                })
                .valign('middle')
                .align('start')
            )
        )
    )
}
