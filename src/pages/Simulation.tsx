import React, { useEffect, useState } from 'react';
import { Badge, Box, Button, IconButton, Select, Option, Slider, Typography, useColorScheme } from '@mui/joy';
import { FiTarget } from 'react-icons/fi';
import { TbRepeat } from 'react-icons/tb';

import { register } from '../utils/themes/charts/Dark';
import Layout from '../components/Layout';
import ScatterView from '../components/ScatterView';
import HeatmapView from '../components/HeatmapView';
import Randomize from '../utils/Randomize';

export default function Simulation() {
  const [values, setValues] = useState<[number, number][]>([]);
  const [iterations, setIterations] = useState(1000);
  const [algorithm, setAlgorithm] = useState<string>(Object.keys(Randomize)[0]);

  const randomize = () => {
    const newValues: typeof values = [];
    for (let i = 0; i < iterations; i++) {
      const randomizer = Randomize[algorithm as keyof typeof Randomize];
      newValues.push([randomizer(0, 1), randomizer(0, 1)]);
    }
    console.log("Randomized, new values:", newValues);
    setValues(newValues);
  };

  useEffect(() => {
    randomize();
    register();
  }, []);

  return (
    <Layout.Root>
      <Layout.Header>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <IconButton
            size="sm"
            variant="solid"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <FiTarget />
          </IconButton>
          <Typography component="h1" fontWeight="xl">
            RNG
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
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
      </Layout.Header>
      <Layout.Main>
        <ScatterView values={values} />
        <HeatmapView values={values} />
      </Layout.Main>
    </Layout.Root>
  );
}