import React, { useMemo, useState } from 'react';
import Layout from '../Layout';
import ReactECharts from 'echarts-for-react';
import { CardOverflow, Divider, Typography, useColorScheme } from '@mui/joy';
import Random from '../../utils/Random';
import { textColors } from '../../utils/themes/charts/Dark';
import View from './View';

export default function DensityBarView({
  values,
  algorithm,
}: {
  values: [number, number][];
  algorithm: keyof typeof Random;
}) {
  const { systemMode } = useColorScheme();
  const [resolution] = useState(0.2);

  const bbox = useMemo(() => {
    if (!values.length) {
      return { x: [0, 1], y: [0, 1] };
    }
    const x = values.map(([x]) => x);
    const y = values.map(([, y]) => y);
    return {
      x: [Math.floor(Math.min(...x)), Math.ceil(Math.max(...x))],
      y: [Math.floor(Math.min(...y)), Math.ceil(Math.max(...y))],
    };
  }, [values]);

  const data: Map<string, number> = useMemo(() => {
    const data = new Map<string, number>();
    for (let x = bbox.x[0]; x <= bbox.x[1]; x += resolution) {
      for (let y = bbox.y[0]; y <= bbox.y[1]; y += resolution) {
        // Count the number of points in the cell
        const count = values.reduce((acc, [x1, y1]) => {
          if (x1 >= x && x1 < x + resolution && y1 >= y && y1 < y + resolution) {
            return acc + 1;
          }
          return acc;
        }, 0);
        data.set(`${x.toFixed(1)},${y.toFixed(1)}`, count);
      }
    }
    return data;
  }, [bbox, algorithm, resolution, values]);

  return (
    <View
      info={`${values.length} points`}
      title="Three-dimensional surface plot"
      description='This chart is a three-dimensional surface plot of the density of points in the plane. The closer to red the color, the more points are in the cell, and the closer to blue, the scarcer they are.'
    >
      <ReactECharts
        option={{

          tooltip: {},
          visualMap: {
            show: false,
            dimension: 2,
            min: 0,
            max: Math.max(...Array.from(data.values())),
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
            min: bbox.x[0],
            max: bbox.x[1]
          },
          yAxis3D: {
            type: 'value',
            min: bbox.y[0],
            max: bbox.y[1]
          },
          zAxis3D: {
            type: 'value',
            splitNumber: 2
          },
          grid3D: {
            boxHeight: 40,
            axisLine: {
              lineStyle: { color: textColors[systemMode as 'dark' | 'light'] },
            },
            splitLine: {
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
                  step: resolution,
                  min: bbox.x[0],
                  max: bbox.x[1]
                },
                y: {
                  step: resolution,
                  min: bbox.y[0],
                  max: bbox.y[1]
                },
                z: (x: number, y: number) => {
                  return data.get(`${x},${y}`) || 0;
                }
              }
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