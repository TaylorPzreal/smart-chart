import * as d3 from 'd3';

export class TreeChart {
  private option: {};

  constructor() {
    this.option = {
      a: 'test'
    };
  }

  public init(config: {}) {
    console.warn(config);

    const svg = d3.select('#tree-element').append('svg');

    const y = d3.scaleLinear().domain([15, 90]).range([150, 0]);
    const x = d3.scaleLog().domain([250, 100000]).range([0, 600]);
    const r = d3.scaleSqrt().domain([52070, 1380000000]).range([10, 50]);

    svg.append('circle').attr('fill', 'red').attr('r', r(1380000000))
  }
}
