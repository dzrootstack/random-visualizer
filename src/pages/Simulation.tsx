import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Box, Button, Select, Option, Slider } from '@mui/joy';
import { TiCogOutline } from 'react-icons/ti';

import { register } from '../utils/themes/charts/Dark';
import Layout from '../components/Layout';
import ScatterView from '../components/view/ScatterView';
import VolumeView from '../components/view/VolumeView';
import Random from '../utils/Random';
import CodeView from '../components/sidebar/CodeView';
import ChatDescription from '../components/sidebar/ChatDescription';
import Formula from '../components/sidebar/Formula';

export default function Simulation() {
  const [result, setResult] = useState<{
    values: [number, number][];
    algorithm: string;
  }>({
    values: [],
    algorithm: Object.keys(Random)[0],
  })
  const [points, setPoints] = useState(1000);
  const [algorithm, setAlgorithm] = useState<string>(Object.keys(Random)[0]);

  register();

  const randomize = useCallback(
    () => {
      const newValues: [number, number][] = [];
      for (let i = 0; i < points; i++) {
        const randomizer = Random[algorithm as keyof typeof Random].generate;
        newValues.push([randomizer(), randomizer()]);
      }
      setResult({
        values: newValues,
        algorithm,
      });
    }
    , [points, algorithm]
  );
  

  useEffect(() => {
    if (!result.values.length) {
      randomize();
    }

  }, [points, algorithm, result, randomize]);

  return (
    <Layout.Root>
      <Layout.Sidebar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: 4,
          }}
        >
          <Box sx={{ gap: 2 }}>
            <Select
              defaultValue={0}
              onChange={(_, value) => setAlgorithm(Object.keys(Random)[value as number])}
            >
              {Object.values(Random).map((value, index) => (
                <Option key={value.name} value={index}>
                  {`${value.name} distribution`}
                </Option>
              ))}
            </Select>
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="points"
                defaultValue={points}
                min={250}
                max={2000}
                step={250}
                onChange={(_, value) => setPoints(value as number)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} points`}
                marks={[
                  { value: 250, label: '250' },
                  { value: 500, label: '500' },
                  { value: 1000, label: '1000' },
                  { value: 2000, label: '2000' },
                ]}
              />
            </Box>
          </Box>
          <Badge badgeContent={result.values.length === points && result.algorithm === algorithm ? 0 : ""}>
            <Button
              onClick={randomize}
            >
              Re-randomize
            </Button>
          </Badge>
        </Box>
        <CodeView code={Random[algorithm as keyof typeof Random].code} />
        <Formula algorithm={algorithm} />
        <ChatDescription algorithm={algorithm}/>
      </Layout.Sidebar>
      <Layout.Main>
        <ScatterView values={result.values} />
        <VolumeView values={result.values} algorithm={result.algorithm} />
      </Layout.Main>
    </Layout.Root>
  );
}