import { jsx } from '@theme-ui/core';
import { AxisLeft } from '@visx/axis';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { Box } from '../containers';

const data1 = [
  {
    x: '2018-03-01',
    y: 30,
  },
  {
    x: '2018-04-01',
    y: 16,
  },
  {
    x: '2018-05-01',
    y: 17,
  },
  {
    x: '2018-06-01',
    y: 24,
  },
  {
    x: '2018-07-01',
    y: 47,
  },
  {
    x: '2018-08-01',
    y: 32,
  },
  {
    x: '2018-09-01',
    y: 8,
  },
  {
    x: '2018-10-01',
    y: 27,
  },
  {
    x: '2018-11-01',
    y: 31,
  },
  {
    x: '2018-12-01',
    y: 105,
  },
  {
    x: '2019-01-01',
    y: 166,
  },
  {
    x: '2019-02-01',
    y: 181,
  },
  {
    x: '2019-03-01',
    y: 232,
  },
  {
    x: '2019-04-01',
    y: 224,
  },
  {
    x: '2019-05-01',
    y: 196,
  },
  {
    x: '2019-06-01',
    y: 211,
  },
];

const tickLabelOffset = 10;

const accessors = {
  xAccessor: d => new Date(`${d.x}T00:00:00`),
  yAccessor: d => d.y,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;
export const LineChart = () => {
  return (
    <Box>
      <XYChart
        height={270}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear' }}
      >
        <AnimatedGrid
          columns={false}
          lineStyle={{
            stroke: '#e1e1e1',
            strokeLinecap: 'round',
            strokeWidth: 1,
          }}
          numTicks={4}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          left={30}
          numTicks={4}
          orientation="bottom"
          tickLabelProps={() => ({ dy: tickLabelOffset })}
        />
        <AxisLeft
          hideAxisLine
          hideTicks
          numTicks={6}
          orientation="left"
          scale={x.range([yMax, 0])}
          tickLabelProps={() => ({ dx: -10 })}
        />

        <AnimatedLineSeries
          data={data1}
          dataKey="primary_line"
          stroke="#008561"
          {...accessors}
        />
        <Tooltip
          showSeriesGlyphs
          snapTooltipToDatumX
          snapTooltipToDatumY
          glyphStyle={{
            fill: '#008561',
            strokeWidth: 0,
          }}
          renderTooltip={({ tooltipData }) => {
            return (
              <Box>
                {Object.entries(tooltipData.datumByKey).map(lineDataArray => {
                  const [key, value] = lineDataArray;

                  return (
                    <div key={key} className="row">
                      <div className="date">
                        {accessors.xAccessor(value.datum).toString()}
                      </div>
                      <div className="value">
                        <Box color="#008561" />
                        {accessors.yAccessor(value.datum)}
                      </div>
                    </div>
                  );
                })}
              </Box>
            );
          }}
        />
      </XYChart>
    </Box>
  );
};
