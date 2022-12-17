import React from 'react';
import Layout from './Layout';
import ReactECharts from 'echarts-for-react';
import { useColorScheme } from '@mui/joy';

export default function HeatmapView({
  values,
}: {
  values: [number, number][];
}) {
  const { systemMode } = useColorScheme();
  return (
    <Layout.Tile>
      <ReactECharts
        option={{
          tooltip: {},
          xAxis: [{}],
          yAxis: [{}],
          series: [
            {
              type: 'heatmap',
              data: values,
              dimensions: ['x', 'y'],
              blendMode: 'source-over',
            }
          ]
        }}
        lazyUpdate
        style={{ height: '600px', width: '600px' }}
        theme={systemMode}
      />
    </Layout.Tile>
  );
}