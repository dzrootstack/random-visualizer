import React from 'react';
import Layout from './Layout';
import ReactECharts from 'echarts-for-react';
import { useColorScheme } from '@mui/joy';

export default function ScoreView({
  values,
}: {
  values: [number, number][];
}) {
  const { systemMode } = useColorScheme();
  
  return (
    <Layout.Tile sx={{height: "600px"}}>
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
    </Layout.Tile>
  );
}