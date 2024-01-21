import * as chrt from 'chrt';
import chrtLabels from '../../../src/chrtLabels';

const colors = ['#00B51D', '#000', '#FF0000', '#00C2FF'];

const data = [
  {
    x: 0,
    y: 20,
  },
  {
    x: 0,
    y: 10,
  },
  {
    x: 0,
    y: -10,
  },
  {
    x: 0,
    y: -20,
  },
];

export default async function (container) {
  return (
    chrt
      .Chrt()
      .node(container)
      .size(200, 500)
      .margins({ left: 50, right: 50, top: 50, bottom: 50 })
      //.x({ domain: [-100, 100] })
      .x({ scale: 'ordinal' })
      .add(
        chrt
          .chrtStack()
          .add(
            chrt
              .chrtColumns()
              .data([data[1]], (d) => ({
                x: d.x,
                y: d.y,
              }))
              .fill('#F2F2F2')
              .stroke(colors[1])
              .strokeWidth(1)
              .inset(20),
          )
          .add(
            chrt
              .chrtColumns()
              .data([data[0]], (d) => ({
                x: d.x,
                y: d.y,
              }))
              .fill('#F2F2F2')
              .stroke(colors[0])
              .strokeWidth(1)
              .inset(20)
              .add(
                chrtLabels()
                  .value('middle x middle')
                  .align('middle')
                  .valign('middle')
                  .fill(colors[0]),
              )
              .add(
                chrtLabels()
                  .value('start x top 1,0')
                  .align('start')
                  .valign('top')
                  .relativePosition([1, 0])
                  .fill(colors[0]),
              )
              .add(
                chrtLabels()
                  .value('end x bottom 0,0')
                  .align('end')
                  .valign('bottom')
                  .relativePosition([0, 0])
                  .fill(colors[0]),
              )
              .add(
                chrtLabels()
                  .value('middle x bottom 0.5,1')
                  .align('middle')
                  .valign('bottom')
                  .relativePosition([0.5, 1])
                  .fill(colors[0]),
              )
              .add(chrtLabels().value('default').fill(colors[0])),
          )
          .add(
            chrt
              .chrtColumns()
              .data([data[2]], (d) => ({
                x: d.x,
                y: d.y,
              }))
              .fill('#F2F2F2')
              .stroke(colors[2])
              .strokeWidth(1)
              .inset(20)
              .add(
                chrtLabels().value('default').valign('bottom').fill(colors[2]),
              )
              .add(
                chrtLabels()
                  .value('middle x middle 0.5,0.5')
                  .align('middle')
                  .valign('middle')
                  .relativePosition([0.5, 0.5])
                  .fill(colors[2]),
              ),
          )
          .add(
            chrt
              .chrtColumns()
              .data([data[3]], (d) => ({
                x: d.x,
                y: d.y,
              }))
              .fill('#F2F2F2')
              .stroke(colors[3])
              .strokeWidth(1)
              .inset(20)
              .add(
                chrtLabels()
                  .value('middle x top')
                  .align('middle')
                  .valign('top')
                  .fill(colors[3]),
              ),
          ),
      )
      .add(chrt.xAxis().zero(0).hideTicks().hideLabels())
  );
}
