// test code

import { BarChart } from '../dist/index.es.js';

const chart = new BarChart('#bar-chart');
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
}]
chart.render(data);
