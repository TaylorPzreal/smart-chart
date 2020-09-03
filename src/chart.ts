import { Line, Bar, Pie } from './charts';
import { XConfiguration, XChartType } from './type';
import { dataToPie, dataToBar, dataToLine, dataToHorizontalBar } from './util/format';

class Chart {
  private dom: HTMLDivElement;
  private chart: echarts.ECharts | null = null;

  constructor(dom: HTMLDivElement) {
    this.dom = dom;
  }

  public render(configuration: XConfiguration) {
    const { type } = configuration;
    if (this.chart) {
      this.chart.dispose();
    }

    if (type === XChartType.line) {
      this.renderLine(configuration);
    } else if (type === XChartType.bar) {
      this.renderBar(configuration);
    } else if (type === XChartType.horizontalBar) {
      this.renderHorizontalBar(configuration);
    } else if (type === XChartType.pie) {
      this.renderPie(configuration);
    } else {
      throw new Error(`The type: ${type} not support`);
    }
  }

  private renderLine(configuration: XConfiguration) {
    const line = new Line(this.dom);
    this.chart = line.chart;

    const data = dataToLine(configuration);
    line.render(data);
  }

  private renderBar(configuration: XConfiguration) {
    const bar = new Bar(this.dom);
    this.chart = bar.chart;
    const seriesData = dataToBar(configuration);
    bar.render(seriesData);
  }

  private renderHorizontalBar(configuration: XConfiguration) {
    const bar = new Bar(this.dom);
    this.chart = bar.chart;
    const seriesData = dataToHorizontalBar(configuration);
    bar.render(seriesData, true);
  }

  private renderPie(configuration: XConfiguration) {
    const pie = new Pie(this.dom);
    this.chart = pie.chart;
    const [data, name] = dataToPie(configuration);
    pie.render(data, name);
  }

  public download(name = 'download-chart'): Promise<string> {
    if (this.chart) {
      const base64Data = this.chart.getDataURL({type: 'png', backgroundColor: '#fff', pixelRatio: 1});
      const a = document.createElement('a');
      a.href = base64Data;
      a.download = `${name}.png`;
      a.click();
      return Promise.resolve('ok');
    } else {
      return Promise.reject(new Error('No Image could download'));
    }
  }
}

export {
  Chart,
}
