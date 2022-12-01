import { jsx } from '@theme-ui/core';
import { ECharts, EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { isEqual } from 'lodash';
import { CSSProperties, PureComponent } from 'react';
import { bind, clear } from 'size-sensor';

export interface Opts {
  readonly devicePixelRatio?: number;
  readonly renderer?: 'canvas' | 'svg';
  readonly width?: number | null | undefined | 'auto';
  readonly height?: number | null | undefined | 'auto';
  readonly locale?: string;
}

export interface EChartsReactProps {
  readonly className?: string;
  readonly echarts?: EChartsOption;
  readonly style?: CSSProperties;
  readonly option: EChartsOption;
  readonly theme?: string | { [key: string]: any };
  readonly notMerge?: boolean;
  readonly lazyUpdate?: boolean;
  readonly showLoading?: boolean;
  readonly loadingOption?: any;
  readonly opts?: Opts;
  readonly onEvents?: { [key: string]: Function };
  readonly autoResize?: boolean;
  readonly onChartReady?: (instance: any) => void;
  readonly shouldSetOption?: (
    prevProps: EChartsReactProps,
    props: EChartsReactProps
  ) => boolean;
}

export class EChart extends PureComponent<EChartsReactProps> {
  element: HTMLElement | null;
  protected echarts: any;
  private isInitialResize: boolean;

  constructor(props: EChartsReactProps) {
    super(props);
    this.echarts = echarts;
    this.element = null;
    this.isInitialResize = true;
  }

  componentDidMount() {
    this.renderNewEcharts();
  }

  componentDidUpdate(prevProps: EChartsReactProps) {
    const { shouldSetOption } = this.props;
    if (
      isFunction(shouldSetOption) &&
      !shouldSetOption?.(prevProps, this.props)
    ) {
      return;
    }
    if (
      !isEqual(prevProps.theme, this.props.theme) ||
      !isEqual(prevProps.opts, this.props.opts) ||
      !isEqual(prevProps.onEvents, this.props.onEvents)
    ) {
      this.dispose();

      this.renderNewEcharts();
      return;
    }
    const pickKeys = [
      'option',
      'notMerge',
      'lazyUpdate',
      'showLoading',
      'loadingOption',
    ];
    if (
      !isEqual(pick(this.props, pickKeys), pick(prevProps as any, pickKeys))
    ) {
      this.updateEChartsOption();
    }
    if (
      !isEqual(prevProps.style, this.props.style) ||
      !isEqual(prevProps.className, this.props.className)
    ) {
      this.resize();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  async initEchartsInstance(): Promise<ECharts> {
    return new Promise(resolve => {
      this.echarts.init(this.element, this.props.theme, this.props.opts);
      const echartsInstance = this.getEchartsInstance();
      echartsInstance.on('finished', () => {
        const width = this.element?.clientWidth;
        const height = this.element?.clientHeight;
        this.echarts.dispose(this.element);
        const opts = {
          width,
          height,
          ...this.props.opts,
        };
        resolve(this.echarts.init(this.element, this.props.theme, opts));
      });
    });
  }

  getEchartsInstance(): ECharts {
    return this.echarts.getInstanceByDom(this.element);
  }

  private dispose() {
    if (this.element) {
      try {
        clear(this.element);
      } catch (e) {
        console.warn(e);
      }
      this.echarts.dispose(this.element);
    }
  }

  private async renderNewEcharts() {
    const { onEvents, onChartReady, autoResize = true } = this.props;
    await this.initEchartsInstance();
    const echartsInstance = this.updateEChartsOption();
    this.bindEvents(echartsInstance, onEvents || {});
    if (isFunction(onChartReady)) onChartReady?.(echartsInstance);
    if (this.element && autoResize) {
      bind(this.element, () => {
        this.resize();
      });
    }
  }

  private bindEvents(instance, events: EChartsReactProps['onEvents']) {
    function _bindEvent(eventName: string, func: Function) {
      if (isString(eventName) && isFunction(func)) {
        instance.on(eventName, param => {
          func(param, instance);
        });
      }
    }
    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  }

  private updateEChartsOption(): any {
    const {
      option,
      notMerge = false,
      lazyUpdate = false,
      showLoading,
      loadingOption = null,
    } = this.props;
    const echartInstance = this.getEchartsInstance();
    echartInstance.setOption(option, notMerge, lazyUpdate);
    if (showLoading) echartInstance.showLoading(loadingOption);
    else echartInstance.hideLoading();

    return echartInstance;
  }

  private resize() {
    const echartsInstance = this.getEchartsInstance();
    if (!this.isInitialResize) {
      try {
        echartsInstance.resize({
          width: 'auto',
          height: 'auto',
        });
      } catch (e) {
        console.warn(e);
      }
    }
    this.isInitialResize = false;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  render(): JSX.Element {
    const { style, className = '' } = this.props;
    const newStyle = { height: 300, ...style };
    return (
      <div
        ref={e => {
          this.element = e;
        }}
        className={`echarts-for-react ${className}`}
        style={newStyle}
      />
    );
  }
}

function isFunction(v): boolean {
  return typeof v === 'function';
}

function isString(v): boolean {
  return typeof v === 'string';
}

function pick(
  obj: { [key: string]: unknown },
  keys: string[]
): { [key: string]: unknown } {
  const r = {};
  keys.forEach(key => {
    r[key] = obj[key];
  });
  return r;
}
