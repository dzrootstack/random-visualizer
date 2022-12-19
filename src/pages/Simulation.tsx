import React, { useEffect, useState } from 'react';
import { Badge, Box, Button,  Select, Option, Slider } from '@mui/joy';
import { TbRepeat } from 'react-icons/tb';

import { register } from '../utils/themes/charts/Dark';
import Layout from '../components/Layout';
import ScatterView from '../components/ScatterView';
import VolumeView from '../components/VolumeView';
import Random from '../utils/Random';
import CodeView from '../components/CodeView';

export default function Simulation() {
  const [values, setValues] = useState<[number, number][]>([]);
  const [points, setPoints] = useState(1000);
  const [algorithm, setAlgorithm] = useState<string>(Object.keys(Random)[0]);

  register();

  const randomize = () => {
    const newValues: typeof values = [];
    for (let i = 0; i < points; i++) {
      const randomizer = Random[algorithm as keyof typeof Random].generate;
      newValues.push([randomizer(), randomizer()]);
    }
    setValues(newValues);
  };

  useEffect(() => {
    const newValues: typeof values = [];
    for (let i = 0; i < points; i++) {
      const randomizer = Random[algorithm as keyof typeof Random].generate;
      newValues.push([randomizer(), randomizer()]);
    }
    setValues(newValues);

  }, [points, algorithm]);

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
          <Box sx={{gap: 2}}>
          <Select
            defaultValue={0}
            onChange={(_, value) => setAlgorithm(Object.keys(Random)[value as number])}
          >
            {Object.entries(Random).map(([key, value], index) => (
              <Option key={key} value={index}>
                {`${key} distribution`}
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
        <Badge badgeContent={values.length === points ? 0 : ""}>
            <Button
              startDecorator={<TbRepeat />}
              onClick={randomize}
            >
              Randomize
            </Button>
          </Badge>
        </Box>
        <CodeView code={Random[algorithm as keyof typeof Random].code} />
        <Box>
          {Random[algorithm as keyof typeof Random].description}
        </Box>
      </Layout.Sidebar>
      <Layout.Main>
        <ScatterView values={values} />
        <VolumeView values={values} algorithm={algorithm}/>
      </Layout.Main>
    </Layout.Root>
  );
}