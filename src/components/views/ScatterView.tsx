import React from 'react';
import Layout from '../Layout';
import ReactECharts from 'echarts-for-react';
import { CardOverflow, Divider, Typography, useColorScheme } from '@mui/joy';
import View from './View';

export default function ScatterView({
  values,
}: {
  values: [number, number][];
}) {
  const { systemMode } = useColorScheme();

  return (
    <View
      info={`${values.length} points`}
      title="Two-dimensional scatter plot"
      description="This chart features a two-dimensional scatter plot of the generated points. The points are colored according to their distance from the origin."
    >
      <ReactECharts
        option={{
          tooltip: {},
          visualMap: {
            show: false,
            dimension: 2,
            min: 0,
            max: Math.max(...values.map(([x, y]) => x ** 2 + y ** 2)),
            inRange: {
              color: [
                '#a50026',
                '#d73027',
                '#f46d43',
                '#fdae61',
                '#fee090',
                '#ffffbf',
                '#e0f3f8',
                '#abd9e9',
                '#74add1',
                '#4575b4',
                '#313695',
              ]
            }
          },
          xAxis: [{}],
          yAxis: [{}],
          series: [
            {
              type: 'scatter',
              data: values.map(([x, y]) => [x, y, x ** 2 + y ** 2]),
              dimensions: ['x', 'y'],
              blendMode: 'source-over',
            }
          ]
        }}
        lazyUpdate
        style={{ height: '100%', width: '100%' }}
        theme={systemMode}
      />
      </View>
  );
}