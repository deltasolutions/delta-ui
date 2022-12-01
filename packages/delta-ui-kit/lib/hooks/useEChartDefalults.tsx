import { DefaultLabelFormatterCallbackParams, graphic } from 'echarts';
import { transparentize } from 'polished';
import { useMemo } from 'react';
import { useDeltaTheme } from './useDeltaTheme';

export const useEChartDefalults = () => {
  const { colors } = useDeltaTheme();
  const line = useMemo(
    () => ({
      grid: () => ({ left: 50, right: 50, top: 10, bottom: 30 }),
      xAxis: () => ({
        type: 'time' as const,
        axisTick: {
          length: 4,
          lineStyle: { type: 'dashed' as const },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: transparentize(0.6, colors.onContext),
          },
        },
        boundaryGap: false,
      }),
      yAxis: () => ({
        type: 'value' as const,
        splitLine: {
          show: true,
          lineStyle: {
            color: transparentize(0.6, colors.onContext),
          },
        },
      }),
      itemStyle: (color: string) => ({ color }),
      areaStyle: (color: string) => ({
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: transparentize(0.5, color),
          },
          {
            offset: 1,
            color: 'transparent',
          },
        ]),
      }),
    }),
    [colors]
  );
  const pie = useMemo(
    () => ({
      tooltip: () => ({
        trigger: 'item' as const,
        formatter: `<b>{b}:</b> {c} ({d}%)`,
      }),
      radius: () => ['60%', '95%'],
      itemStyle: () => ({
        borderWidth: 6,
        borderRadius: 8,
        borderColor: colors.accentContext,
      }),
      emphasis: () => ({
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 'bold' as const,
        },
      }),
      label: () => ({
        position: 'inner' as const,
        fontSize: 14,
        color: colors.accentOnContext,
        formatter: ({ data }: DefaultLabelFormatterCallbackParams) =>
          data['value'],
      }),
    }),
    [colors]
  );
  return useMemo(() => ({ line, pie }), [line, pie]);
};
