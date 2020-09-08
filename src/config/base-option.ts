import { EChartOption } from 'echarts';
import { XOptionConfiguration } from '../type';
const optionColor = {
  text: 'rgba(51,51,51,0.6)',
  axis: '#d7d9dc',
  line: 'rgba(215,217,220,0.6)',
  tooltipBackground: 'rgba(50,52,55, 0.88)',
};

const colors = [
  '#3278ff',
  '#6840b0',
  '#28a080',
  '#e8703c',
  '#e85858',
];

function getBaseOption(assignedOption: EChartOption = {}, configuration?: XOptionConfiguration) {
  const option: EChartOption = {
    tooltip: {},
    grid: {
      top: '2%',
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      nameTextStyle: {
        color: optionColor.text,
      },
      axisLabel: {
        color: optionColor.text,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: optionColor.axis,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: optionColor.line,
          width: 0.5,
        },
      },
    },
    yAxis: {
      show: true,
      type: 'value',
      nameTextStyle: {
        color: optionColor.text,
      },
      axisLabel: {
        color: optionColor.text,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: optionColor.axis,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: optionColor.line,
          width: 0.5,
        },
      },
    },
    series: [],
  };

  if (configuration?.useDataZoom) {
    option.dataZoom = [
        {   type: 'slider',
            show: true,
            realtime: true,
            start: 70,
            end: 100,
            xAxisIndex: [0],
            backgroundColor: 'transparent',
            textStyle: {
              color: optionColor.text,
              fontSize: 12,
            },
            handleStyle: {
              color: colors[0],
              borderColor: colors[0],
            },
        },
    ];

    (option.grid as echarts.EChartOption.Grid)!.bottom = '46px';
  }

  return Object.assign({}, option, assignedOption);
}

const lineSeries: EChartOption.SeriesLine = {
  type: 'line',
  smooth: true,
  lineStyle: {
    color: colors[0],
  },
  itemStyle: {
    color: colors[0],
  },
};

const barSeries: EChartOption.SeriesBar = {
  type: 'bar',
  barWidth: '16px',
  itemStyle: {
    color: colors[0],
  },
};

const barHorizontalLabel = {
  show: true,
  position: 'insideLeft',
  distance: 10,
  align: 'left',
  fontSize: 12,
  formatter: (params: any) => {
    return `${params.value[0]}`
  },
};

const pieSeries: EChartOption.SeriesPie = {
  type: 'pie',
  radius: ['57.3%', '90%'],
  label: {
    show: true,
    position: 'inner',
    formatter: '{d}%',
  },
  emphasis: {
    label: {
      show: true,
    }
  },
};

export {
  getBaseOption,
  lineSeries,
  barSeries,
  pieSeries,
  colors,
  optionColor,
  barHorizontalLabel,
}
