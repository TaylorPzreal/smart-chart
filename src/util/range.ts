function reflectRange(value: number, sMin: number, sMax: number, tMin: number, tMax: number): number {
  return Math.floor((value - sMin) / (sMax - sMin) * (tMax - tMin)) + tMin;
}

export {
  reflectRange,
}
