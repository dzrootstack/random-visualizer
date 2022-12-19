import React from 'react';
import Layout from './Layout';
import ReactECharts from 'echarts-for-react';
import { useColorScheme } from '@mui/joy';
import { gaussianProbability } from '../utils/Random';
import { textColors } from '../utils/themes/charts/Dark';

export default function ProbabilityView({
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
          visualMap: {
            show: false,
            dimension: 2,
            min: -1,
            max: 1,
            inRange: {
              color: [
                '#313695',
                '#4575b4',
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffbf',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026'
              ]
            }
          },
          xAxis3D: {
            type: 'value',
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value',
            max: 1,
            splitNumber: 2
          },
          grid3D: {
            boxHeight: 40,
            axisLine: {
              lineStyle: { color: textColors[systemMode as 'dark' | 'light'] },
            },
            axisPointer: {
              lineStyle: { color: textColors[systemMode as 'dark' | 'light'] }
            },
          },
          series: [
            {
              type: 'surface',
              name: 'Probability',
              wireframe: {
                show: false
              },
              shading: 'color',
              equation: {
                x: {
                  step: 0.1,
                  min: -3,
                  max: 3
                },
                y: {
                  step: 0.1,
                  min: -3,
                  max: 3
                },
                z: gaussianProbability
              },
              itemStyle: {
                opacity: 0.3
              }
            },
            {
              type: 'scatter3D',
              name: 'Samples',
              symbolSize: 5,
              data: values.map(([x, y]) => [x, y, gaussianProbability(x, y)]),
              dimensions: ['x', 'y', 'z'],
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