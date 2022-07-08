import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';

import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from 'echarts/charts';

import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  MarkLineComponent,
  MarkLineComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import throttle from 'lodash/throttle';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOptions = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | MarkLineComponentOption
  | DataZoomComponentOption
  | ToolboxComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  MarkLineComponent,
  DataZoomComponent,
  ToolboxComponent,
]);

/*
 *@ 教程 https://echarts.apache.org/zh/index.html
 *@ 配置按需引入
 */
export interface ILine {
  id: string;
  option: ECOptions;
  item: any;
  className?: string;
  width?: number | string;
  height?: number;
  linkTo?: any;
}

export const Bar = (props: ILine) => {
  const { option, height, id, linkTo, item } = props;

  const myChart = useRef(null);

  useEffect(() => {
    myChart.current = echarts.init(document.getElementById(props.id) as HTMLElement);

    myChart.current.on('click', function (params) {
      linkTo && linkTo(params.name, item);
    });

    return () => {
      myChart.current?.dispose();
      document.getElementById(props.id) && echarts.dispose(document.getElementById(props.id));
    };
  }, [props.id]);

  useEffect(() => {
    option && myChart.current?.setOption(option, true);

    const resize = throttle(() => {
      const el: HTMLElement = document.getElementById(id);
      // 表示该dom未进入可视区
      if (!el.getBoundingClientRect().width) {
        return;
      }
      myChart.current?.resize();
    }, 300);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [option]);

  return (
    <>
      <div
        id={props.id}
        key={props.id}
        className={props.className}
        style={{
          // width: props.width || 380,
          height: props.height || 260,
        }}
      ></div>
    </>
  );
};
