export function gaussianProbability(x: number, y: number, mean: number = 0, sigma: number = 1) {
  return Math.exp(-((x - mean) ** 2 + (y - mean) ** 2) / (2 * sigma ** 2));
}

function gaussian(mean: number = 0, stdDev: number = 1): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * stdDev + mean;
}

export function uniformProbability(x: number, y: number, min: number = -1, max: number = 1) {
  return (x >= min && x <= max && y >= min && y <= max) ? 1 : 0;
}

function uniform(min: number = -1, max: number = 1): number {
  return Math.random() * (max - min) + min;
}

const Random = {
  gaussian,
  uniform,
};

export default Random;