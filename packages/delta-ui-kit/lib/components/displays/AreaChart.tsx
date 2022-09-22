import { jsx } from '@theme-ui/core';
import { curveCardinal } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import {
  buildChartTheme,
  AnimatedAreaSeries,
  XYChart,
  AnimatedGrid,
  AnimatedAxis,
  Tooltip,
} from '@visx/xychart';
import { useMemo } from 'react';
import { useDeltaTheme } from '../../hooks';
import { Box, Heading } from '../containers';

export interface AreaChartProps<T extends object> {
  data: T[];
  color?: string;
  xTicks?: number;
  yTicks?: number;
  yAccessor: any;
  xAccessor: any;
  formatX?: (v: number | string | Date) => string;
  formatY?: (v: number | string | Date) => string;
}
const tickLabelOffset = 10;

export const AreaChart = <T extends object>({
  data,
  yAccessor,
  xAccessor,
  formatX,
  formatY,
  color = 'success',
  xTicks = 20,
  yTicks = 10,
}: AreaChartProps<T>) => {
  const { colors } = useDeltaTheme();
  const mainColor = colors[color] ?? colors.success;
  const theme = useMemo(
    () =>
      buildChartTheme({
        backgroundColor: mainColor,
        colors: [mainColor],
        gridColor: 'rgba(255,255,255,0.01)',
        gridStyles: {
          stroke: 'rgba(255,255,255,0.2)',
          strokeLinecap: 'round',
        },
        gridColorDark: 'rgba(255,255,255,0.01)',
        tickLength: 8,
        htmlLabel: {
          color: 'red',
        },
        yAxisLineStyles: {
          color: 'red',
        },
      }),
    [colors, mainColor]
  );

  return (
    <Box
      style={{ height: 400 }}
      sx={{
        '.visx-axis-tick': {
          text: { fontSize: '12px', fontWeight: 400, fill: 'onCelestial' },
        },
      }}
    >
      <XYChart
        height={400}
        margin={{ top: 10, left: 50, right: 50, bottom: 40 }}
        theme={theme}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear' }}
      >
        <LinearGradient
          from={mainColor}
          fromOpacity={0.3}
          id="gradient"
          toOpacity={0.2}
        />
        <AnimatedGrid
          columns={false}
          numTicks={yTicks}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          left={30}
          numTicks={xTicks}
          orientation="bottom"
          tickLabelProps={() => ({ dy: tickLabelOffset })}
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          labelClassName="asix-label"
          numTicks={yTicks}
          orientation="left"
        />
        <AnimatedAreaSeries
          curve={curveCardinal}
          data={data}
          dataKey="primary_line"
          fill="url(#gradient)"
          xAccessor={xAccessor}
          yAccessor={yAccessor}
        />

        <Tooltip
          showSeriesGlyphs
          showVerticalCrosshair
          snapTooltipToDatumX
          snapTooltipToDatumY
          renderTooltip={({ tooltipData }) => (
            <Box
              sx={{
                p: 2,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Heading level={4} sx={{ color: 'exterior' }}>
                {/* {yAccessor(tooltipData?.nearestDatum?.datum)} */}
              </Heading>
              <Heading level={6} sx={{ fontWeight: 300, color: 'exterior' }}>
                {/* {xAccessor(tooltipData?.nearestDatum?.datum)} */}
              </Heading>
            </Box>
          )}
        />
      </XYChart>
    </Box>
  );
};
