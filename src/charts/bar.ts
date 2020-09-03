import echarts, { EChartOption } from 'echarts';
import { getBaseOption, barSeries, barHorizontalLabel, colors } from '../config/base-option';

export class Bar {
  public chart: echarts.ECharts;
  private options: EChartOption;

  constructor(dom: HTMLDivElement) {
    this.chart = echarts.init(dom);
    this.options = this.baseOptions();
  }

  private baseOptions(): EChartOption {
    const option: EChartOption = {
      tooltip: {
        trigger: 'item',
      },
    };

    return getBaseOption(option);
  }

  public render(seriesData: EChartOption.SeriesBar[], isHorizontal = false) {
    if (isHorizontal) {
      this.renderHorizontal(seriesData);
    } else {
      this.renderVertical(seriesData);
    }
  }

  private renderVertical(seriesData: EChartOption.SeriesBar[]) {
    this.options.series = seriesData.map((s: EChartOption.SeriesBar, i: number) => ({
      ...barSeries,
      ...s,
      itemStyle: {
        color: colors[i % colors.length],
      },
    }));
    this.chart.setOption(this.options);
  }

  private renderHorizontal(seriesData: EChartOption.SeriesBar[]) {
    (this.options.xAxis as EChartOption.XAxis).type = 'value';
    (this.options.yAxis as EChartOption.YAxis).type = 'category';
    (this.options.yAxis as EChartOption.YAxis).axisLine!.show = true;

    this.options.series = seriesData.map((s: EChartOption.SeriesBar, i: number) => ({
      ...barSeries,
      ...s,
      label: barHorizontalLabel,
      itemStyle: {
        color: colors[i % colors.length],
      },
    }));

    this.chart.setOption(this.options);
  }
}
