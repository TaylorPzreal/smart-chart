# smart-chart

> A chart library base d3.js.

 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)  [![GitHub version](https://badge.fury.io/gh/TaylorPzreal%2Fsmart-chart.svg)](https://badge.fury.io/gh/TaylorPzreal%2Fsmart-chart)
[![npm version](https://badge.fury.io/js/smart-chart.svg)](https://badge.fury.io/js/smart-chart)

## Example

### BarChart

![BarChart](./docs/bar.png)

## Installition

```bash
npm i -S SmartChart
```

## Usage

```ts
import {BarChart, MapChart} from 'smart-chart'
```

```ts
    const data = [{
      name: '1992',
      value: 2
    }, {
      name: '1993',
      value: 3
    }, {
      name: '1995',
      value: 6
    }, {
      name: '1996',
      value: 8
    }, {
      name: '1997',
      value: 12
    }];
    const chart = new BarChart('#bar-chart');
    chart.render(data);

    // map-chart
    new MapChart('#map-chart', '../dist/localdb/world_countries.json');
```

### Or use it in JS

```html
<script src="path/to/dist/index.js"></script>
```

```js
const chart = new SmartChart.BarChart('#bar-chart');

const mapChart = new MapChart('#map-chart', 'path/to/dist/localdb/word_countries.json');
```

## Tools

- http-server use it for dev
- rollup use it for prod
- gulp use it for stream build
