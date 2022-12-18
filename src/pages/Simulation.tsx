import React, { useEffect, useState } from 'react';
import { Badge, Box, Button,  Select, Option, Slider } from '@mui/joy';
import { TbRepeat } from 'react-icons/tb';

import { register } from '../utils/themes/charts/Dark';
import Layout from '../components/Layout';
import ScatterView from '../components/ScatterView';
import ScoreView from '../components/ScoreView';
import Randomize from '../utils/Randomize';
import CodeView from '../components/CodeView';

export default function Simulation() {
  const [values, setValues] = useState<[number, number][]>([]);
  const [iterations, setIterations] = useState(1000);
  const [algorithm, setAlgorithm] = useState<string>(Object.keys(Randomize)[0]);

  const randomize = () => {
    const newValues: typeof values = [];
    for (let i = 0; i < iterations; i++) {
      const randomizer = Randomize[algorithm as keyof typeof Randomize];
      newValues.push([randomizer(), randomizer()]);
    }
    setValues(newValues);
  };

  useEffect(() => {
    const newValues: typeof values = [];
    for (let i = 0; i < iterations; i++) {
      const randomizer = Randomize[algorithm as keyof typeof Randomize];
      newValues.push([randomizer(), randomizer()]);
    }
    setValues(newValues);
    
    register();
  }, [iterations, algorithm]);

  return (
    <Layout.Root>
      <Layout.Sidebar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: 4,
          }}
        >
          <Select
            defaultValue={0}
            onChange={(_, value) => setAlgorithm(Object.keys(Randomize)[value as number])}
          >
            {Object.entries(Randomize).map(([key, value], index) => (
              <Option key={key} value={index}>
                {`${key} distribution`}
              </Option>
            ))}
          </Select>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Iterations"
              defaultValue={iterations}
              min={0}
              max={2000}
              step={250}
              onChange={(_, value) => setIterations(value as number)}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: '0' },
                { value: 500, label: '500' },
                { value: 1000, label: '1000' },
                { value: 2000, label: '2000' },
              ]}
            />
          </Box>
          <Badge badgeContent={values.length === iterations ? 0 : ""}>
            <Button
              size="sm"
              startDecorator={<TbRepeat />}
              onClick={randomize}
            >
              Randomize
            </Button>
          </Badge>
        </Box>
        <CodeView code={Randomize[algorithm as keyof typeof Randomize].toString()} />
      </Layout.Sidebar>
      <Layout.Main>
        <ScatterView values={values} />
        <ScoreView values={values} />
      </Layout.Main>
    </Layout.Root>
  );
}