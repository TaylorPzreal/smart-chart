import echarts, { EChartOption } from 'echarts';
import { getBaseOption, lineSeries, colors, optionColor } from '../config/base-option';
import { XOptionConfiguration } from '../type';

export class Line {
  public chart: echarts.ECharts;
  private options: EChartOption;

  constructor(dom: HTMLDivElement, configuration?: XOptionConfiguration) {
    this.chart = echarts.init(dom);
    this.options = this.baseOptions(configuration);
  }

  private baseOptions(configuration?: XOptionConfiguration): EChartOption {
    const option: EChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: optionColor.line,
          },
        },
        backgroundColor: optionColor.tooltipBackground,
      },
    };

    return getBaseOption(option, configuration);
  }

  public render(lines: EChartOption.SeriesLine[]) {
    this.options.series = lines.map((line: EChartOption.SeriesLine, i: number) => ({
      ...lineSeries,
      ...line,
      lineStyle: {
        color: colors[i % colors.length],
      },
      itemStyle: {
        color: colors[i % colors.length],
      },
    }));

    this.chart.setOption(this.options);
  }
}
