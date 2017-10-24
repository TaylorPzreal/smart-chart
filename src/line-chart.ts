import * as d3 from 'd3';

export class LineChart {
  private option: {};

  constructor() {
    this.option = {
      a: 'test'
    };
  }

  public init(config: {}) {
    console.warn(config);
  }
}