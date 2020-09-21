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

export interface XGeoData {
  name: string;
  value: number;
  coords: [number, number],
}

export interface XGeoPointData {
  name: string;
  value: [number, number, number];
  itemStyle: {
    color: string;
  };
}

export interface XGeoLineData {
  coords: [[number, number], [number, number]];
  lineStyle: {
    color: string;
  }
}

export type XGeoBarData = [number, string][];

export interface XGeoConfiguration {
  data: XGeoData[];
  targetCoords: [number, number];
  mapName: string;
  topName: string;
  barName: string;
}
