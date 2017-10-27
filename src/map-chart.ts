import * as d3 from 'd3';
// import { RollupType } from 'd3';

export class MapChart {
  private projection: any;
  private svg: any;

  constructor(e: string, geoDataPath: string) {
    this.init(e, geoDataPath);
  }

  public init(e: string, geoDataPath: string) {
    d3.json(geoDataPath, geo_data => {
      const margin = 75;
      const width = 1400 - margin;
      const height = 600 - margin;

      this.svg = d3
        .select(e)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('class', 'map');

      this.projection = d3
        .geoMercator()
        .scale(140)
        .translate([width / 2, height / 1.2]);

      const path = d3.geoPath().projection(this.projection);

      const map = this.svg
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

  public plot_points(data) {
    function agg_year(leaves) {
      const total = d3.sum(leaves, (d: any) => d['attendance']);
      const coords = leaves.map((d: any) => this.projection([+d.long, +d.lat]));
      const center_x = d3.mean(coords, d => d[0]);
      const center_y = d3.mean(coords, d => d[1]);

      return {
        attendance: total,
        x: center_x,
        y: center_y
      };
    }

    const nested = d3
      .nest()
      .key((d: any) => {
        return d['date'].getUTCFullYear();
      })
      .rollup(agg_year)
      .entries(data);

    const attendance_max = d3.max(nested, (d: any) => d.values['attendance']);

    const radius = d3
      .scaleSqrt()
      .domain([0, attendance_max])
      .range([0, 15]);

    this.svg
      .append('g')
      .attr('class', 'bubble')
      .selectAll('circle')
      .data(nested.sort((a: any, b: any) => {
        return b.values['attendance'] - a.values['attendance'];
      }))
      .enter()
      .append('circle')
      .attr('cx', (d: any) => d.values['x'])
      .attr('cy', (d: any) => d.values['y'])
      .attr('r', (d: any) => radius(d.values['attendance']))
      .attr('fill', 'rgb(247, 148, 32)')
      .attr('stroke', 'block')
      .attr('stroke-width', 0.7)
      .attr('opacity', 0.7);
  }

  public render(dataPath) {
    const format: any = d3.timeParse('%d-%m-%Y (%H:%M h)');

    d3.tsv(
      dataPath,
      (d: any)=> {
        d['attendance'] = +d['attendance'];
        d['date'] = format(d['date']);

        return d;
      },
      this.plot_points.bind(this, this)
    );
  }
}
