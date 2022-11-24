import { jsx } from '@theme-ui/core';
import { LinearGradient } from '@visx/gradient';
import {
  buildChartTheme,
  AreaSeries,
  XYChart,
  Grid,
  Axis,
  Tooltip,
} from '@visx/xychart';
import { transparentize } from 'polished';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useDeltaTheme } from '../../hooks';
import { BoxProps, Box, Heading } from '../containers';

export interface AreaChartProps<T extends object> extends BoxProps {
  data: T[];
  color?: string;
  xTicks?: number;
  yTicks?: number;
  yAccessor: any;
  xAccessor: any;
  formatX: (v: number | string | Date) => string;
  formatY: (v: number | string | Date) => string;
  formatYTick?: (v) => string;
  formatXTick?: (v) => string;
  xScale: any;
  yScale: any;
  xAngleTicks?: number;
  yAngleTicks?: number;
  xWidthTicks?: number;
  yWidthTicks?: number;
}

const tickLabelOffset = 10;

export const AreaChart = <T extends object>({
  data,
  yAccessor,
  xAccessor,
  formatX,
  formatY,
  xScale,
  yScale,
  formatXTick,
  formatYTick,
  color = 'primary',
  xTicks = 3,
  yTicks = 8,
  xAngleTicks = 0,
  yAngleTicks = 0,
  xWidthTicks = 35,
  yWidthTicks = 15,
  ...rest
}: AreaChartProps<T>) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const { colors } = useDeltaTheme();
  const mainColor = colors[color] ?? color;
  const theme = useMemo(
    () =>
      // TODO: Remove hardcoded values.
      buildChartTheme({
        backgroundColor: colors.secondary,
        colors: [mainColor],
        gridColor: 'rgba(255, 255, 255, 0.01)',
        gridStyles: {
          stroke: 'rgba(255, 255, 255, 0.2)',
          strokeLinecap: 'round',
        },
        gridColorDark: 'rgba(255,255,255,0.01)',
        tickLength: 8,
      }),
    [colors, mainColor]
  );
  useEffect(() => {
    if (!container) {
      setWidth(undefined);
      setHeight(undefined);
      return;
    }
    const handleSizes = () => {
      setWidth(container.clientWidth);
      setHeight(container.clientHeight);
    };
    handleSizes();
    const observer = new ResizeObserver(handleSizes);
    observer.observe(container);
    return () => observer.disconnect();
  }, [container]);
  return (
    <Box
      ref={setContainer}
      sx={{
        width: '100%',
        height: '100%',
        '.visx-axis-tick': {
          text: {
            fontSize: '12px',
            fontWeight: 400,
            fill: 'onCelestial',
          },
        },
      }}
      {...rest}
    >
      <XYChart
        height={height}
        margin={{ left: 50, right: 35, top: yWidthTicks, bottom: xWidthTicks }}
        theme={theme}
        width={width}
        xScale={xScale}
        yScale={yScale}
      >
        <LinearGradient
          from={transparentize(0.4, mainColor)}
          id="gradient"
          to="transparent"
        />
        <Axis
          hideAxisLine
          hideTicks
          numTicks={xTicks}
          orientation="bottom"
          tickFormat={formatXTick}
          tickLabelProps={() => ({ dy: tickLabelOffset, angle: xAngleTicks })}
        />
        <Grid columns={false} numTicks={xTicks} strokeDasharray="0,4" />
        <Axis
          hideAxisLine
          hideTicks
          labelClassName="asix-label"
          numTicks={yTicks}
          orientation="left"
          tickFormat={formatYTick}
          tickLabelProps={() => ({ angle: yAngleTicks })}
        />
        <AreaSeries
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
                {formatY(yAccessor(tooltipData?.nearestDatum?.datum))}
              </Heading>
              <Heading level={6} sx={{ fontWeight: 300, color: 'exterior' }}>
                {formatX(xAccessor(tooltipData?.nearestDatum?.datum))}
              </Heading>
            </Box>
          )}
        />
      </XYChart>
    </Box>
  );
};
