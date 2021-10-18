import * as chrt from 'chrt';
import chrtLabels from '../../../src/chrtLabels';

const colors = {
  very: '#D2A931',
  somewhat: '#E4CB84',
  somewhat2: '#63BAAD',
  very2: '#347667'
};

const data = {
  very: [
    {
      y: 'All adults',
      x: 23
    },
    {
      y: 'Ages 18-29',
      x: 16
    },
    {
      y: '30-49',
      x: 16
    },
    {
      y: '50-64',
      x: 26
    },
    {
      y: '65+',
      x: 26
    }
  ],
  somewhat: [
    {
      y: 'All adults',
      x: 24
    },
    {
      y: 'Ages 18-29',
      x: 23
    },
    {
      y: '30-49',
      x: 23
    },
    {
      y: '50-64',
      x: 24
    },
    {
      y: '65+',
      x: 25
    }
  ],
  somewhat2: [
    {
      y: 'All adults',
      x: 25
    },
    {
      y: 'Ages 18-29',
      x: 27
    },
    {
      y: '30-49',
      x: 25
    },
    {
      y: '50-64',
      x: 26
    },
    {
      y: '65+',
      x: 23
    }
  ],
  very2: [
    {
      y: 'All adults',
      x: 27
    },
    {
      y: 'Ages 18-29',
      x: 34
    },
    {
      y: '30-49',
      x: 27
    },
    {
      y: '50-64',
      x: 22
    },
    {
      y: '65+',
      x: 24
    }
  ]
};

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .margins({ left: 100 })
    .x({ domain: [-100, 100] })
    .y({ scale: 'ordinal' })
    .add(
      chrt
        .chrtStack()
        .orientation('left')
        .add(
          chrt
            .chrtBars()
            .data(data.somewhat, d => ({
              x: -d.x,
              y: d.y
            }))
            .fill(colors.somewhat)
            .inset(5)
            .add(
              chrtLabels()
                .value(d => Math.abs(d.x))
                .valign('middle')
                .align('middle')
                .relativePosition([0.5,0.5])
            )
        )
        .add(
          chrt
            .chrtBars()
            .data(data.very, d => ({
              x: -d.x,
              y: d.y
            }))
            .fill(colors.very)
            .inset(5)
            .add(
              chrtLabels()
                .value(d => Math.abs(d.x))
                .valign('middle')
                .align('middle')
                .relativePosition([0.5,0.5])
            )
            .add(
              chrtLabels()
                .value((d,i) => {
                  return data.very[i].x + data.somewhat[i].x
                })
                .valign('middle')
                .align('start')
            )
        )
        .add(
          chrt
            .chrtBars()
            .data(data.somewhat2, d => ({
              x: d.x,
              y: d.y
            }))
            .fill(colors.somewhat2)
            .inset(5)
            .add(
              chrtLabels()
                .value(d => d.x)
                .valign('middle')
                .align('middle')
                .relativePosition([0.5,0.5])
            )
        )
        .add(
          chrt
            .chrtBars()
            .data(data.very2, d => ({
              x: d.x,
              y: d.y
            }))
            .fill(colors.very2)
            .inset(5)
            .add(
              chrtLabels()
                .value(d => d.x)
                .valign('middle')
                .align('middle')
                .relativePosition([0.5,0.5])
            )
            .add(
              chrtLabels()
                .value((d,i) => {
                  return data.very2[i].x + data.somewhat2[i].x
                })
                .valign('middle')
                .align('start')
            )
        )
    )
    .add(
      chrt
        .yAxis()
        .zero(0)
        .hideTicks()
    );
}
