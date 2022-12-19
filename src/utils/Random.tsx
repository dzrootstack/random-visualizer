import { Typography } from '@mui/joy';
import React from 'react';
import Latex from 'react-latex';

const Random: {
  [key: string]: {
    probability: (x: number, y: number, ...args: number[]) => number;
    generate: (...args: number[]) => number;
    code: string;
    description: JSX.Element;
  };
} = {
  gaussian: {
    probability: function (x: number, y: number, mean: number = 0, sigma: number = 1) {
      return Math.exp(-((x - mean) ** 2 + (y - mean) ** 2) / (2 * sigma ** 2));
    },
    generate: function (mean: number = 0, stdDev: number = 1): number {
      let u = 0;
      let v = 0;
      while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * stdDev + mean;
    },
    code: `function gaussian(x, y, mean = 0, sigma = 1) {
  return Math.exp(-((x - mean) ** 2 + (y - mean) ** 2) / (2 * sigma ** 2));
}`,
    description: (
      <div>
        <Latex displayMode>
          {`$$
            f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}
          $$`}
        </Latex>
        <p>
          The Gaussian distribution is a continuous probability distribution that is symmetric about
          the mean, showing that data near the mean are more frequent in occurrence than data far
          from the mean.It is also known as the normal distribution.
        </p>
        <p>
          The Gaussian distribution is defined by two parameters, the mean and the standard deviation.
          The mean is the expected value of the distribution, and the standard deviation is a measure
          of how spread out numbers are.
        </p>
        <p>
          The Gaussian distribution is the most important distribution in statistics. It is used in
          many fields, including engineering, physics, finance, and medicine.
        </p>
      </div>
    ),
  },
  uniform: {
    probability: function (x: number, y: number, min: number = -1, max: number = 1) {
      return (x >= min && x <= max && y >= min && y <= max) ? 1 : 0;
    },
    generate: function (min: number = -1, max: number = 1): number {
      return Math.random() * (max - min) + min;
    },
    code: `function uniform(x, y, min = -1, max = 1) {
  return (x >= min && x <= max && y >= min && y <= max) ? 1 : 0;
}`,
    description: (
      <div>
        <Typography 
          level='h5'
        >
        <Latex displayMode>
          {`$$
          f(x) = \\begin{cases}
            \\frac{1}{b-a} & a \\leq x \\leq b \\\\
            0 & \\text{otherwise}
          \\end{cases}
        $$`}
        </Latex>  
        </Typography>
        <p>
          The uniform distribution is a continuous probability distribution that describes the
          probability that a value occurring is equally likely to be any value within a specified
          range.
        </p>
        <p>
          The uniform distribution is defined by two parameters, the minimum and the maximum. The
          minimum is the lowest possible value that can be generated, and the maximum is the highest
          possible value that can be generated.
        </p>
        <p>
          The uniform distribution is the most basic distribution in statistics.It is used in many
          fields, including engineering, physics, finance, and medicine.
        </p>
      </div>
    ),
  },
};

export default Random;