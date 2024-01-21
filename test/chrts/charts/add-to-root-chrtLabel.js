import * as chrt from 'chrt';
import chrtLabel from '../../../src/chrtLabel';

export default async function (container) {
  return chrt
    .Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis())
    .add(chrt.yAxis())
    .add(chrt.horizontalRange().from(0.5).strokeOpacity(0.2))
    .add(chrt.verticalRange().from(0.5).strokeOpacity(0.2))
    .add(
      chrtLabel('test')
        .top(0.5)
        .left(0.5)
        .offset(0, 0)
        .align('middle')
        .valign('middle')
        .color('#f6f'),
    )
    .add(
      chrtLabel('test')
        .top(0.5)
        .left(0.5)
        .offset(0, 0)
        .align('start')
        .valign('top')
        .color('#f6f'),
    )
    .add(
      chrtLabel('test')
        .top(0.5)
        .left(0.5)
        .offset(0, 0)
        .align('start')
        .valign('bottom')
        .color('#f6f'),
    )
    .add(
      chrtLabel()
        .text('test')
        .top(0.5)
        .left(0.5)
        .offset(0, 0)
        .align('end')
        .valign('top')
        .color('#000'),
    )
    .add(
      chrtLabel()
        .value('test')
        .top(0.5)
        .left(0.5)
        .offset(0, 0)
        .align('end')
        .valign('bottom')
        .color('#000'),
    );
}
