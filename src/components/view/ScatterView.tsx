import React from 'react';
import Layout from '../Layout';
import ReactECharts from 'echarts-for-react';
import { CardOverflow, Divider, Typography, useColorScheme } from '@mui/joy';

export default function ScatterView({
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
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1.5,
          py: 1.5,
          px: 2,
          bgcolor: 'background.level1',
        }}
      >
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {values.length} points
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          Scatter two-dimensional plot
        </Typography>
      </CardOverflow>
    </Layout.Tile >
  );
}