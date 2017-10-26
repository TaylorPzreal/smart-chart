import * as d3 from 'd3';

export class MapChart {
  constructor(e: string, geoDataPath: string) {
    this.init(e, geoDataPath);
  }

  public init(e: string, geoDataPath: string) {
    d3.json(geoDataPath, geo_data => {
      const margin = 75;
      const width = 1220 - margin;
      const height = 800 - margin;

      const svg = d3
        .select(e)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('class', 'map');

      const projection = d3
        .geoMercator()
        .scale(170)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      const map = svg
        .selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', 'rgb(9, 157, 217')
        .style('stroke', 'black')
        .style('stroke-width', 0.5);
    });
  }

  // public render() {}
}
