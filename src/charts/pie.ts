import echarts, { EChartOption } from 'echarts';
import { pieSeries, colors, optionColor } from '../config/base-option';
import { XData } from '../type';

export class Pie {
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
        formatter: (params: any) => {
          const {name, seriesName, value, percent, color } = params;

          return `
            <div style="padding: 6px 12px;">
              <div style="width: 100%;text-align: left; margin-bottom: 6px; color: rgba(255,255,255,0.6)">${seriesName}</div>
              <div>
                <span style="display: inline-block;width:4px;height:8px;margin-right: 4px;background-color:${color}"></span>
                <span style="margin-right: 10px">${name}</span>
                <span style="margin-right: 10px;">${value}</span>
                <span>${percent}%</span>
              </div>
            </div>
          `;
        },
        backgroundColor: optionColor.tooltipBackground,
      },
      legend: {
        type: 'scroll',
        show: true,
        right: 16,
        bottom: 16,
        orient: 'vertical',
        height: 200,
        icon: 'rect',
        itemWidth: 4,
        itemHeight: 8,
        textStyle: {
          color: '#8c9098',
          fontSize: 12,
        },
        pageTextStyle: {
          color: '#8c9098',
          fontSize: 12,
        },
        pageIconSize: 10,
      },
    };

    return option;
  }

  public render(data: XData, name: string) {
    const fData = (data as  EChartOption.SeriesLine.DataObject[]).map((d, i: number) => ({
      ...d,
      itemStyle: {
        color: colors[i % colors.length],
      }
    }));

    this.options.series = [{
      ...pieSeries,
      data: fData,
      name,
    }];
    this.chart.setOption(Object.assign({}, this.options));
  }
}
