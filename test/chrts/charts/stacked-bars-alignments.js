import * as chrt from 'chrt';
import chrtLabels from '~/chrtLabels';

const colors = ['#00B51D', '#000', '#FF0000', '#00C2FF'];

const data = [
    {
      y: 0,
      x: -20
    },
    {
      y: 0,
      x: -20
    },
    {
      y: 0,
      x: 20
    },
    {
      y: 0,
      x: 20
    },
  ];

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(800,160)
    .margins({ left: 50, right: 50, top: 30, bottom: 30 })
    //.x({ domain: [-100, 100] })
    .y({ scale: 'ordinal' })
    .add(
      chrt
        .chrtStack()
        .orientation('left')
        .add(
          chrt
            .chrtBars()
            .data([data[1]], d => ({
              x: d.x,
              y: d.y
            }))
            .fill('#F2F2F2')
            .stroke(colors[1])
            .strokeWidth(1)
            .inset(20)
            .add(
              chrtLabels()
                .value('middle x middle')
                .align('middle')
                .valign('middle')
                .fill(colors[1])
            )
            .add(
              chrtLabels()
                .value('end x bottom 1,0')
                .align('end')
                .valign('bottom')
                .relativePosition([1, 0])
                .fill(colors[1])
            )
            .add(
              chrtLabels()
                .value('end x top 1,1')
                .align('end')
                .valign('top')
                .relativePosition([1, 1])
                .fill(colors[1])
            )
            .add(
              chrtLabels()
                .value('middle x middle 0.5,0.5')
                .align('middle')
                .valign('middle')
                .relativePosition([0.5, 0.5])
                .fill(colors[1])
            )
        )
        .add(
          chrt
            .chrtBars()
            .data([data[0]], d => ({
              x: d.x,
              y: d.y
            }))
            .fill('#F2F2F2')
            .stroke(colors[0])
            .strokeWidth(1)
            .inset(20)
            .add(
              chrtLabels()
                .value('middle x middle 1,0.75')
                .align('middle')
                .valign('middle')
                .relativePosition([1, 0.75])
                .fill(colors[0])
            )
            .add(
              chrtLabels()
                .value('end x bottom 1,0')
                .align('end')
                .valign('bottom')
                .relativePosition([1, 0])
                .fill(colors[0])
            )
            .add(
              chrtLabels()
                .value('end x top 1,1')
                .align('end')
                .valign('top')
                .relativePosition([1, 1])
                .fill(colors[0])
            )
            .add(
              chrtLabels()
                .value('middle x middle 0.5,0.75')
                .align('middle')
                .valign('middle')
                .relativePosition([0.5, 0.5])
                .fill(colors[0])
            )
            .add(
              chrtLabels()
                .value('start x top')
                .align('start')
                .valign('top')
                .relativePosition([1, 0])
                .fill(colors[0])
            )
            .add(
              chrtLabels()
                .value('default')
                .fill(colors[0])
            )
        )
        .add(
          chrt
            .chrtBars()
            .data([data[2]], d => ({
              x: d.x,
              y: d.y
            }))
            .fill('#F2F2F2')
            .stroke(colors[2])
            .strokeWidth(1)
            .inset(20)
            .add(
              chrtLabels()
                .value('middle x middle')
                .align('middle')
                .valign('middle')
                .fill(colors[2])
            )
            .add(
              chrtLabels()
                .value('end x bottom 1,0')
                .align('end')
                .valign('bottom')
                .relativePosition([1, 0])
                .fill(colors[2])
            )
            .add(
              chrtLabels()
                .value('end x top 1,1')
                .align('end')
                .valign('top')
                .relativePosition([1, 1])
                .fill(colors[2])
            )
            .add(
              chrtLabels()
                .value('middle x middle 0.5,0.5')
                .align('middle')
                .valign('middle')
                .relativePosition([0.5, 0.5])
                .fill(colors[2])
            )
        )
        .add(
          chrt
            .chrtBars()
            .data([data[3]], d => ({
              x: d.x,
              y: d.y
            }))
            .fill('#F2F2F2')
            .stroke(colors[3])
            .strokeWidth(1)
            .inset(20)
            .add(
              chrtLabels()
                .value('middle x middle 1,0.75')
                .align('middle')
                .valign('middle')
                .relativePosition([1, 0.75])
                .fill(colors[3])
            )
            .add(
              chrtLabels()
                .value('start x top')
                .align('start')
                .valign('top')
                .relativePosition([1, 0])
                .fill(colors[3])
            )
            .add(
              chrtLabels()
                .value('default')
                .fill(colors[3])
            )
        )
    )
    .add(
      chrt
        .yAxis()
        .zero(0)
        .hideTicks()
        .hideLabels()
    );
}
