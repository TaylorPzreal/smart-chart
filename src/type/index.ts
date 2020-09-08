import { EChartOption } from "echarts";

export enum XChartType {
  line = 'line',
  bar = 'bar',
  horizontalBar = 'horizontalBar',
  pie = 'pie',
}

export type XData = (string | number | EChartOption.SeriesLine.DataObject)[] | (string | number | EChartOption.SeriesLine.DataObject)[][];

export type XDataTuple = [(string|number), (string|number)];

export interface XDataSerial {
  name: string;
  data: XDataTuple[];
}

export interface XConfiguration {
  type: XChartType,
  title?: string;
  serials: XDataSerial[],
  optionConfiguration?: XOptionConfiguration;
}

export interface XOptionConfiguration {
  useDataZoom: boolean;
}
