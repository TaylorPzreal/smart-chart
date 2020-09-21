import echarts, { ECharts, EChartOption } from "echarts";
import { barSeries, getBaseOption, optionColor } from "../config/base-option";
import { XGeoConfiguration, XGeoBarData, XGeoData, XGeoLineData, XGeoPointData } from '../type';
import { reflectRange } from "../util/range";

/**
此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果

默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。

http://echarts.baidu.com/option.html#series-map.geoIndex

并且加了pin气泡图标以示数值大小
*/

function formatToPointData(data: XGeoData[]): XGeoPointData[] {
  return data.map((d: XGeoData, i: number) => ({
    name: d.name,
    value: [...d.coords, d.value],
    itemStyle: {
      color: pointColors[i % pointColors.length],
    }
  }));
}

function formatToLineData(data: XGeoData[], targetCoords: [number, number]): XGeoLineData[] {
  return data.map((d: XGeoData, i: number) => ({
    coords: [
      d.coords,
      targetCoords,
    ],
    lineStyle: {
      color: pointColors[i % pointColors.length],
    },
  }));
}

function formatToBarData(data: XGeoData[]): XGeoBarData {
  return data.map((d: XGeoData) => ([d.value, d.name]));
}

function formatToMapData(data: XGeoData[]) {
  return data.map((d: XGeoData) => ({
    name: d.name,
    value: d.coords.concat(d.value),
  }));
}


function getMinMax(data: XGeoData[]) {
  let min = data[0].value, max = data[0].value;
  for (const item of data) {
    if (min > item.value) {
      min = item.value;
    }
    if (max < item.value) {
      max = item.value;
    }
  }

  return [min, max];
}

const pointColors = [
  '#4ab2e5',
  '#4fb6d2',
  '#52b9c7',
  '#5abead',
  '#f34e2b',
  '#f56321',
  '#f56f1c',
  '#f58414',
  '#f58f0e',
  '#f5a305',
  '#e7ab0b',
  '#dfae10',
  '#d5b314',
  '#c1bb1f',
  '#b9be23',
  '#96cc34',
];

export class ChinaMap {
  public chart: ECharts;
  private options: EChartOption = {};

  constructor(dom: HTMLDivElement) {
    this.chart = echarts.init(dom);
    this.chart.showLoading();
    this.getBaseOptions();
  }

  private getBaseOptions() {
    import("../localdb/china.json")
      .then((data: { default: any }) => {
        const geoJson = data.default;
        this.chart.hideLoading();
        echarts.registerMap("china", geoJson);

        const options: EChartOption = {
          backgroundColor: "#F3F3F3",
          tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
              const {name, seriesName, value, color } = params;
    
              return `
                <div style="padding: 6px 12px;">
                  <div style="width: 100%;text-align: left; margin-bottom: 6px; color: rgba(255,255,255,0.6)">${seriesName}</div>
                  <div>
                    <span style="display: inline-block;width:4px;height:8px;margin-right: 4px;background-color:${color}"></span>
                    <span style="margin-right: 10px">${name}</span>
                    <span style="margin-right: 10px;">${value}</span>
                  </div>
                </div>
              `;
            },
            backgroundColor: optionColor.tooltipBackground,
          },
          grid: [{
            right: '6%',
            top: '15%',
            bottom: '10%',
            width: '20%'
          }],
          geo: {
            show: false,
            map: "china",
            aspectScale: 0.75, //长宽比
            center: [113.83531246, 34.0267395887],
            zoom: 1.1,
            roam: false,
            itemStyle: {
              normal: {
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#09132c", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#274d68", // 100% 处的颜色
                    },
                  ],
                  globalCoord: true, // 缺省为 false
                },
                shadowColor: "rgb(58,115,192)",
                shadowOffsetX: 1,
                shadowOffsetY: 1,
              },
              emphasis: {
                areaColor: "#2AB8FF",
                borderWidth: 0,
                color: "green",
                label: {
                  show: false,
                },
              },
            },
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  areaColor: "rgba(0, 10, 52, 1)",

                  borderColor: "rgba(0, 10, 52, 1)",
                  normal: {
                    opacity: 0,
                    label: {
                      show: false,
                      color: "#009cc9",
                    },
                  },
                },
              },
            ],
          },
          series: [
            {
              tooltip: {
              },
              type: "map",
              center: [113.83531246, 34.0267395887],
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "#8d93ab",
                  },
                },
                emphasis: {
                  textStyle: {
                    color: "#393b44",
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "#d6e0f0",
                  borderWidth: 1,
                  areaColor: {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#d6e0f0", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#f1f3f8", // 100% 处的颜色
                      },
                    ],
                    globalCoord: true, // 缺省为 false
                  },
                },
                emphasis: {
                  areaColor: "#d6e0f0",
                  borderWidth: 0.1,
                },
              },
              zoom: 1.1,
              roam: false,
              map: "china",
              data: []
            },
            {
              tooltip: {
                formatter: (params: any) => {
                  const {name, seriesName, value, color } = params;
        
                  return `
                    <div style="padding: 6px 12px;">
                      <div style="width: 100%;text-align: left; margin-bottom: 6px; color: rgba(255,255,255,0.6)">${seriesName}</div>
                      <div>
                        <span style="display: inline-block;width:4px;height:8px;margin-right: 4px;background-color:${color}"></span>
                        <span style="margin-right: 10px">${name}</span>
                        <span style="margin-right: 10px;">${value[2]}</span>
                      </div>
                    </div>
                  `;
                },
              },
              type: "effectScatter",
              coordinateSystem: "geo",
              showEffectOn: "render",
              zlevel: 1,
              rippleEffect: {
                period: 15,
                scale: 4,
                brushType: "fill",
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  offset: [15, 0],
                  color: "#1DE9B6",
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "#1DE9B6",
                  shadowBlur: 10,
                  shadowColor: "#333",
                },
              },
              // symbolSize: 12,
              data: [],
            }, //地图线的动画效果
            {
              tooltip: {},
              type: "lines",
              zlevel: 2,
              effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: "arrow", //箭头图标
                symbolSize: 7, //图标大小
              },
              lineStyle: {
                color: "#1DE9B6",
                width: 1, //线条宽度
                opacity: 0.1, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
              },
              data: [],
            },
          ],
        };

        options.series?.push({
          ...barSeries,
          xAxisIndex: 0,
          yAxisIndex: 0,
          zlevel: 3,
          tooltip: {
            formatter: (params: any) => {
              const {name, seriesName, value, color } = params;
    
              return `
                <div style="padding: 6px 12px;">
                  <div style="width: 100%;text-align: left; margin-bottom: 6px; color: rgba(255,255,255,0.6)">${seriesName}</div>
                  <div>
                    <span style="display: inline-block;width:4px;height:8px;margin-right: 4px;background-color:${color}"></span>
                    <span style="margin-right: 10px">${name}</span>
                    <span style="margin-right: 10px;">${value[0]}</span>
                  </div>
                </div>
              `;
            },
          },
          data: [],
        });

        options.series?.push({
          label: {
            show: false,
          },
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [],
        });


        this.options = getBaseOption(options);
        (this.options.xAxis as EChartOption.XAxis).type = 'value';
        (this.options.yAxis as EChartOption.YAxis).type = 'category';
        (this.options.yAxis as EChartOption.YAxis).axisLine!.show = true;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  public render(configuration: XGeoConfiguration) {
    const {
      data,
      targetCoords,
      mapName,
      topName,
      barName,
    } = configuration;

    const pointData = formatToPointData(data);
    const lineData = formatToLineData(data, targetCoords);
    const barData = formatToBarData(data);
    const mapData = formatToMapData(data);
    const [min, max] = getMinMax(data);

    this.options.series![0].data = mapData;
    this.options.series![1].data = pointData.slice(0, 9);
    this.options.series![2].data = lineData.slice(0, 9);
    this.options.series![3].data = barData.slice(0, 9);
    this.options.series![4].data = mapData;

    this.options.series![0].name = mapName;
    this.options.series![1].name = topName;
    this.options.series![3].name = barName;

    (this.options.series![1] as EChartOption.SeriesTree).symbolSize = function (val: any) {
      // min = 4, max = 20
      return reflectRange(val[2], min, max, 4, 20);
    },


    this.chart.setOption(this.options, true);
  }
}
