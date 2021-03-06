# smart-chart

> A chart library comprises other charts like echarts, d3 etc.

 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)  [![GitHub version](https://badge.fury.io/gh/TaylorPzreal%2Fsmart-chart.svg)](https://badge.fury.io/gh/TaylorPzreal%2Fsmart-chart)
[![npm version](https://badge.fury.io/js/smart-chart.svg)](https://badge.fury.io/js/smart-chart)

> Note that the smart-chart dependent on ```echarts```, you should install it separately.

Update records

|Features|Version|Date|
|---|---|---|
|Line, Bar, Horizontal Bar, Pie, Download|2.0.0-alpha.1|2020/09/03|
|DataZoom, Auto Resize|2.0.0-alpha.2|2020/09/08|
|MapChart + BarChart|2.0.0-alpha.3|2020/09/21|

## Installition

```bash
npm i -S smart-chart
```

## Usage

A common chart that you can switch chart type: line, bar, horizontal bar, pie. You just need one data structure.

```ts
import { Chart, XConfiguration, XChartType, XDataSerial } from 'smart-chart';

const chart = new Chart(document.getElementById('chart') as HTMLDivElement);

function changeChartType() {
  const types = Object.values(XChartType);
  const type = types[this.nextType++ % types.length];

  const configuration: XConfiguration = {
    type,
    serials: [
      {
        name: 'item1',
        data: [['2020-09-01', 11], ['2020-09-02', 17], ['2020-09-03', 17]],
      },
      {
        name: 'item2',
        data: [['2020-09-01', 17], ['2020-09-02', 13], ['2020-09-03', 14]],
      },
      {
        name: 'item3',
        data: [['2020-09-01', 7], ['2020-09-02', 13], ['2020-09-03', 13]],
      }
    ],
  };
  chart.render(configuration);
}
```

### Download image

```ts
chart.download('Saved file name').then((v: string) => {
  console.log(v);
}).catch((e: Error) => {
  console.log(e);
});
```

### Or use it in JS

```html
<script src="path/to/dist/index.js"></script>
```

```js
const chart = new SmartChart.Chart(document.getElementById('chart'));
```

### MapChart

```ts
import { ChinaMap, XGeoConfiguration, XGeoData } from 'smart-chart';

const chart = new ChinaMap(document.getElementById('chart') as HTMLDivElement);

const mockData: XGeoConfiguration = {
  data: [
        {
          name: 'A',
          value: 10,
          coords: [118.8062, 31.9208],
        },
        {
          name: 'B',
          value: 32,
          coords: [127.9688, 45.368],
        },
        {
          name: 'C',
          value: 43,
          coords: [110.3467, 41.4899],
        },
        {
          name: 'D',
          value: 54,
          coords: [125.8154, 44.2584],
        },
  ],
  targetCoords: [103.5901, 36.3043],
  mapName: '区域数据',
  topName: 'Top 6',
  barName: 'Top 20',
}

chart.renderChart(mockData);
```

## Examples

![mapChart](./docs/mapchart.png)
![Line](./docs/line.png)
![Bar](./docs/bar.png)
![Horizontal Bar](./docs/horizontal-bar.png)
![Pie](./docs/pie.png)
