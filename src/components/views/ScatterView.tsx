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
          xAxis: [{}],
          yAxis: [{}],
          series: [
            {
              type: 'scatter',
              data: values,
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