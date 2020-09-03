import echarts, { EChartOption } from 'echarts';
import { getBaseOption, lineSeries, colors, optionColor } from '../config/base-option';

export class Line {
  public chart: echarts.ECharts;
  private options: EChartOption;

  constructor(dom: HTMLDivElement) {
    this.chart = echarts.init(dom);
    this.options = this.baseOptions();
  }

  private baseOptions(): EChartOption {
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

    return getBaseOption(option);
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
