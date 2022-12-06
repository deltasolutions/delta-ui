import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import dayjs from 'dayjs';
import { TooltipComponentFormatterCallbackParams } from 'echarts';
import { useEChartDefalults, useDeltaTheme } from '../../hooks';
import { Card, CardBody, CardHeader, Heading } from '../containers';
import { TabGroup, TabOption } from '../navs';
import { EChart } from './EChart';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default {
  title: 'Displays/EChart',
} as Meta;

export const AreaChart = () => {
  const { colors } = useDeltaTheme();
  const defaults = useEChartDefalults();
  const data = new Array(30)
    .fill(undefined)
    .map((_, index) => ({
      close: Math.random() * 80,
      date: new Date().getTime() - 1000 * 60 * 60 * index,
    }))
    .reverse();
  return (
    <Card>
      <CardHeader>
        <Heading level={3}>Temperature</Heading>
      </CardHeader>
      <CardBody sx={{ mb: 4 }}>
        <TabGroup activeId="1D">
          <TabOption id="1D" variant="underline">
            1D
          </TabOption>
          <TabOption id="5D" variant="underline">
            5D
          </TabOption>
          <TabOption id="1M" variant="underline">
            1M
          </TabOption>
          <TabOption id="1Y" variant="underline">
            1Y
          </TabOption>
          <TabOption id="MAX" variant="underline">
            MAX
          </TabOption>
        </TabGroup>
      </CardBody>
      <CardBody sx={{ width: '1000px', height: '300px' }} variant="wide">
        <EChart
          option={{
            tooltip: {
              trigger: 'axis',
              formatter: (v: TooltipComponentFormatterCallbackParams) => {
                const [x, y] = v[0].data;
                const date = new Date(x);
                return (
                  `<b>${y.toFixed(2)} Celsius</b>` +
                  '<br/>' +
                  dayjs(date).format('YYYY-MM-DD HH:mm')
                );
              },
              axisPointer: { animation: true },
            },
            grid: defaults.line.grid(),
            xAxis: defaults.line.xAxis(),
            yAxis: defaults.line.yAxis(),
            series: [
              {
                data: data.map(i => [i.date, i.close]),
                type: 'line',
                smooth: true,
                itemStyle: defaults.line.itemStyle(colors.primary),
                areaStyle: defaults.line.areaStyle(colors.primary),
              },
            ],
            calculable: true,
            animationDuration: 3,
          }}
        />
      </CardBody>
    </Card>
  );
};

export const PieChart = () => {
  const { colors } = useDeltaTheme();
  const defaults = useEChartDefalults();
  const data = {
    OK: 10,
    WARNING: 3,
    CRITICAL: 4,
    UNKNOWN: 2,
  };
  return (
    <Card>
      <CardHeader>
        <Heading level={3}>Temperature</Heading>
      </CardHeader>
      <CardBody sx={{ width: '400px', height: '300px' }} variant="wide">
        <EChart
          option={{
            tooltip: defaults.pie.tooltip(),
            series: [
              {
                color:
                  Object.keys(data).map(
                    key =>
                      ({
                        OK: colors.accentSuccess,
                        WARNING: colors.accentWarning,
                        CRITICAL: colors.accentError,
                        UNKNOWN: colors.accentOnContext,
                      }[key] ?? colors.accentOnContext)
                  ) ?? [],
                type: 'pie',
                radius: defaults.pie.radius(),
                avoidLabelOverlap: false,
                itemStyle: defaults.pie.itemStyle(),
                emphasis: defaults.pie.emphasis(),
                label: defaults.pie.label(),
                labelLine: { show: false },
                data: Object.entries(data).map(([key, value]) => ({
                  value,
                  name: key,
                  key: key,
                })),
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
};
