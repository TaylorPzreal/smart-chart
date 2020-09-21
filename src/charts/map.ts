import echarts, { EChartOption } from "echarts";

const data:{name: string, value: number}[] = [
  {name: '海门', value: 9},
  {name: '鄂尔多斯', value: 12},
  {name: '招远', value: 12},
  {name: '舟山', value: 12},
  {name: '齐齐哈尔', value: 14},
  {name: '盐城', value: 15},
  {name: '赤峰', value: 16},
  {name: '青岛', value: 18},
  {name: '乳山', value: 18},
  {name: '金昌', value: 19},
  {name: '泉州', value: 21},
  {name: '莱西', value: 21},
  {name: '日照', value: 21},
  {name: '胶南', value: 22},
  {name: '南通', value: 23},
];
const geoCoordMap: {[key: string]: number[]} = {
 '海门':[121.15,31.89],
 '鄂尔多斯':[109.781327,39.608266],
 '招远':[120.38,37.35],
 '舟山':[122.207216,29.985295],
 '齐齐哈尔':[123.97,47.33],
 '盐城':[120.13,33.38],
 '赤峰':[118.87,42.28],
 '青岛':[120.33,36.07],
 '乳山':[121.52,36.89],
 '金昌':[102.188043,38.520089],
 '泉州':[118.58,24.93],
 '莱西':[120.53,36.86],
 '日照':[119.46,35.42],
 '胶南':[119.97,35.88],
 '南通':[121.05,32.08],
};

const convertData = function (data: any) {
 const res = [];
 for (let i = 0; i < data.length; i++) {
     const geoCoord = geoCoordMap[data[i].name];
     if (geoCoord) {
         res.push({
             name: data[i].name,
             value: geoCoord.concat(data[i].value)
         });
     }
 }
 return res;
};


export class Map {
  public chart: echarts.ECharts;
  private options: EChartOption;

  constructor(dom: HTMLDivElement) {
    this.chart = echarts.init(dom);
    this.options = this.getBaseOption();
  }

  private getBaseOption(): EChartOption {
    const option: any = {
      tooltip : {
          trigger: 'item'
      },
      geo: {
        map: 'china',
        label: {
            emphasis: {
              //    是否显示鼠标移入省份的时候显示出省份名称
            show: true
            }
        },
        roam: true,
        itemStyle: {
            normal: {
             //    设置地图的颜色
             //    areaColor: '#92FEFE',
                areaColor:"white",     
             //    #F6EFA6
                borderColor: '#111'
            },
            emphasis: {
             //    鼠标移入/高亮的时地图的颜色
                areaColor: '#00A0EA'
            }
        },
      },
      bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
              styleJson: [{
                  'featureType': 'water',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#d1d1d1'
                  }
              }, {
                  'featureType': 'land',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#f3f3f3'
                  }
              }, {
                  'featureType': 'railway',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'off'
                  }
              }, {
                  'featureType': 'highway',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#fdfdfd'
                  }
              }, {
                  'featureType': 'highway',
                  'elementType': 'labels',
                  'stylers': {
                      'visibility': 'off'
                  }
              }, {
                  'featureType': 'arterial',
                  'elementType': 'geometry',
                  'stylers': {
                      'color': '#fefefe'
                  }
              }, {
                  'featureType': 'arterial',
                  'elementType': 'geometry.fill',
                  'stylers': {
                      'color': '#fefefe'
                  }
              }, {
                  'featureType': 'poi',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'off'
                  }
              }, {
                  'featureType': 'green',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'off'
                  }
              }, {
                  'featureType': 'subway',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'off'
                  }
              }, {
                  'featureType': 'manmade',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#d1d1d1'
                  }
              }, {
                  'featureType': 'local',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#d1d1d1'
                  }
              }, {
                  'featureType': 'arterial',
                  'elementType': 'labels',
                  'stylers': {
                      'visibility': 'off'
                  }
              }, {
                  'featureType': 'boundary',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#fefefe'
                  }
              }, {
                  'featureType': 'building',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#d1d1d1'
                  }
              }, {
                  'featureType': 'label',
                  'elementType': 'labels.text.fill',
                  'stylers': {
                      'color': '#999999'
                  }
              }]
          }
      },
      series : [
          {
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: convertData(data),
              symbolSize: function (val: any) {
                  return val[2] / 10;
              },
              encode: {
                  value: 2
              },
              label: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
              },
              itemStyle: {
                  color: 'purple'
              },
              emphasis: {
                  label: {
                      show: true
                  }
              }
          },
          {
              name: 'Top 6',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              data: convertData(data.sort(function (a, b) {
                  return b.value - a.value;
              }).slice(0, 6)),
              symbolSize: function (val: any) {
                  return val[2] / 10;
              },
              encode: {
                  value: 2
              },
              showEffectOn: 'render',
              rippleEffect: {
                  brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
              },
              itemStyle: {
                  // color: 'purple',
                  // shadowBlur: 10,
                  // shadowColor: '#333'
              },
              zlevel: 1
          }
      ]
     };

     return option;
  }

  public render() {
    this.chart.setOption(this.options);
  }
}
