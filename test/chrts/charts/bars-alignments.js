import * as chrt from 'chrt';
import chrtLabels from '~/chrtLabels';

const colors = ['#00B51D', '#000', '#FF0000', '#00C2FF'];

const data = [
  {
    y: 0,
    x: 20
  },
  {
    y: 1,
    x: -20
  },
  // {
  //   y: 2,
  //   x: 20
  // },
  // {
  //   y: 3,
  //   x: -20
  // }
];

export default async function(container) {
  return (
    chrt
      .Chrt()
      .node(container)
      .size(800, 300)
      .margins({ left: 50, right: 50, top: 30, bottom: 30 })
      //.x({ domain: [-100, 100] })
      .y({ scale: 'ordinal' })
      .add(
        chrt
          .chrtBars()
          .data(data, d => ({
            x: d.x,
            y: d.y
          }))
          .fill('#F2F2F2')
          .stroke(colors[0])
          .strokeWidth(1)
          //.inset(20)
          .add(
            chrtLabels()
              .value('middle x middle')
              .align('middle')
              .valign('middle')
              .fill(colors[0])
          )
          .add(
            chrtLabels()
              .value('start x top')
              .valign('top')
              .align('start')
              .relativePosition([1,0])
              .fill(colors[0])
          )
          .add(
            chrtLabels()
              .value('end x bottom')
              .valign('bottom')
              .align('end')
              .relativePosition([1,1])
              .fill(colors[0])
          )
          .add(
            chrtLabels()
              .value('end x top 1,1')
              .valign('top')
              .align('end')
              .relativePosition([1,1])
              .fill(colors[0])
          )
          .add(
            chrtLabels()
              .value('end x top 1,0')
              .valign('bottom')
              .align('end')
              .relativePosition([1,0])
              .fill(colors[0])
          )
          .add(
            chrtLabels()
              .value('middle x middle 0.5,0.5')
              .valign('middle')
              .align('middle')
              .relativePosition([0.5,0.5])
              .fill(colors[0])
          )
          // .add(
          //   chrtLabels()
          //     .value('right')
          //     .align('right')
          //     .valign('center')
          //     .fill(colors[0])
          // )
          // .add(
          //   chrtLabels()
          //     .value('start')
          //     .align('start')
          //     .valign('top')
          //     .fill(colors[1])
          // )
          // .add(
          //   chrtLabels()
          //     .value('end')
          //     .align('end')
          //     .valign('top')
          //     .fill(colors[1])
          // )
          // .add(
          //   chrtLabels()
          //     .value('middle')
          //     .align('middle')
          //     .valign('bottom')
          //     .fill(colors[1])
          // )
      )
      .add(
        chrt
          .yAxis()
          .zero(0)
          .hideTicks()
          .hideLabels()
      )
  );
}
