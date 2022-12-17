function gaussian(mean: number, stdDev: number) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num * stdDev + mean;
  return num;
}

function uniform(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function normal(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Randomize = {
  gaussian,
  uniform,
  normal,
};

export default Randomize;