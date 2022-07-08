import { Empty } from '@didi/dcloud-design';
import React, { useEffect, useState } from 'react';
import { Bar, ECOptions } from './Bar';
import './index.less';

const BarCharts = (props: {
  barList: any[];
  type: string;
  dashBoardData: Record<string, any>;
  getKeys?: any;
  linkTo?: any;
}): JSX.Element => {
  const hasData = (item) => {
    return !!(props.dashBoardData?.[item.key]?.histogramChatValue || []).length;
  };
  const getBarOption = (item) => {
    const data = props.dashBoardData?.[item.key]?.histogramChatValue || [];
    let xAxisData = data.map((item) => item.key);

    if (props.getKeys) {
      xAxisData = props.getKeys(data);
    }

    const seriesData = data.map((item) => item.value);

    const options = {
      title: {
        subtext: item.title,
        textStyle: {
          color: '#212529',
          fontFamily: 'PingFangSC-Regular',
          fontSize: 14,
        },
        left: 8,
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisTick: {
          lineStyle: {
            color: '#D3D8E4',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#D3D8E4',
          },
        },
        fontFamily: 'PingFangSC-Regular',
        axisLabel: {
          color: '#464646',
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#D3D8E4',
          },
        },
        axisLabel: {
          color: '#464646',
          formatter: (value) => {
            return item.formatter ? item.formatter(value) : value;
          },
        },
      },
      grid: {
        top: 50,
        left: 16,
        right: 15,
        bottom: 11,
        containLabel: true,
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          barWidth: 28,
          showBackground: true,
          backgroundStyle: {
            color: '#E5E9F3',
            opacity: 0.4,
          },
          itemStyle: {
            color: '#556EE6',
          },
        },
      ],
    } as ECOptions;

    return options;
  };

  return (
    <>
      <div className="dashboard-bar-chart">
        <h3 className={`title`}>{props.type}</h3>
        <div className="content">
          {props.barList.map((item) =>
            hasData(item) ? (
              <Bar id={item.key} key={item.key} className={'bar-item'} item={item} linkTo={props.linkTo} option={getBarOption(item)} />
            ) : (
              <Empty className="bar-item" />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BarCharts;
