import * as d3 from 'd3';
import { Selection, BaseType } from 'd3';

type Margin = { top?: number; right?: number; bottom?: number; left?: number };

interface OptionType {
  width?: number;
  height?: number;
  barHeight?: number;
  barWidth?: number;
  margin?: Margin;
}

export class BarChart {
  private chart: Selection<BaseType, {}, HTMLElement, any>; // chart svg element
  private width: number; // view width
  private height: number; // view height
  private barHeight: number; // bar height
  private barWidth: number; // bar width
  private x: any; // x axis
  private y: any; // y axis
  private margin: Margin;
  private xAxis;
  private yAxis;

  constructor(e: string, options?: OptionType) {
    this.init(e, options);
  }

  private init(e: string, options?: OptionType) {
    this.margin = {
      top: (options && options.margin.top) || 20,
      right: (options && options.margin.right) || 20,
      bottom: (options && options.margin.bottom) || 20,
      left: (options && options.margin.left) || 20
    };

    this.width = ((options && options.width) || 420) - this.margin.left - this.margin.right;
    this.height = ((options && options.height) || 300) - this.margin.top - this.margin.bottom;

    this.barHeight = (options && options.barHeight) || 20;
    // this.barWidth = options.barWidth || this.width / data.length || 20;

    this.x = d3.scaleLinear().range([0, this.width]);
    // this.x = d3.scaleOrdinal().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);

    this.xAxis = d3.axisBottom(this.x);
    this.yAxis = d3.axisLeft(this.y);

    this.chart = d3
      .select(e)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  public render(data: { name: string; value: number }[]) {
    if (!data) {
      return;
    }

    this.x.domain([0, d3.max(data, (d: any) => d.value)]);
    this.y.domain([0, d3.max(data, (d: any) => d.value)]);

    this.barWidth = this.width / data.length;

    // this.chart.attr('height', this.barHeight * data.length);

    this.chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(this.xAxis);

    this.chart
      .append('g')
      .attr('class', 'y axis')
      .call(this.yAxis);

    const bar = this.chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return `translate(${i * this.barWidth}, 0)`;
      });

    bar
      .append('rect')
      .attr('y', (d: any) => this.y(d.value))
      .attr('height', (d: any) => this.height - this.y(d.value))
      .attr('width', this.barWidth - 1);
    bar
      .append('text')
      .attr('x', this.barWidth / 2)
      .attr('y', (d: any) => this.y(d.value) + 3)
      .attr('dy', '.75em')
      .text((d: any) => d.value);
  }
}
