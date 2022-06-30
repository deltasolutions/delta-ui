import { jsx } from '@theme-ui/core';
import { LinearGradient } from '@visx/gradient';
import { AreaSeries, XYChart, Tooltip } from '@visx/xychart';
import { transparentize } from 'polished';
import { useDeltaTheme } from '../../hooks';
import { Box } from '../containers';

export interface AreaChartProps<T extends object> {
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  data: T[];
  color?: string;
  getX: (v: T) => number | string | Date;
  getY: (v: T) => number | string | Date;
  formatX?: (v: number | string | Date) => string;
  formatY?: (v: number | string | Date) => string;
}

export const AreaChart = <T extends object>({
  height = 300,
  margin = { left: 0, right: 0, top: 0, bottom: 0 },
  data,
  color = 'primary',
  getX,
  getY,
  formatX,
  formatY,
}: AreaChartProps<T>) => {
  const { colors } = useDeltaTheme();
  const colorString = colors[color] ?? color;
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <XYChart
        height={height}
        margin={margin}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
      >
        <LinearGradient
          from={transparentize(0.5, colorString)}
          id="gradient"
          to="transparent"
        />

        <AreaSeries
          data={data}
          dataKey="data"
          fill="url(#gradient)"
          lineProps={{ stroke: colorString }}
          xAccessor={getX}
          yAccessor={getY}
        />
        <Tooltip
          showSeriesGlyphs
          showVerticalCrosshair
          snapTooltipToDatumX
          snapTooltipToDatumY
          glyphStyle={{
            fill: colorString,
            stroke: colors.onContext,
            strokeWidth: '3px',
          }}
          renderTooltip={({ tooltipData }) => {
            const nearest = tooltipData?.nearestDatum;
            if (!nearest) {
              return null;
            }
            const x = getX(nearest.datum as T);
            const y = getY(nearest.datum as T);
            return (
              <Box sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                {`${formatX?.(x) ?? x}, ${formatY?.(y) ?? y}`}
              </Box>
            );
          }}
          verticalCrosshairStyle={{
            stroke: colors.onPrimary,
            strokeWidth: '2px',
            strokeDasharray: '3 5',
          }}
        />
      </XYChart>
    </Box>
  );
};
