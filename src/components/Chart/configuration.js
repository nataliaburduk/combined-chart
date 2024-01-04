import { UNITS } from '../../utils/units';

export const BASE_CHART_OPTIONS = {
  grid: {
    top: 60,
    left: 100,
    right: 100,
    bottom: 80,
  },
  legend: {
    bottom: 0,
  },
  title: {
    left: '50%',
    textAlign: 'center',
  },
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: {
    nameLocation: 'middle',
    nameGap: 25,
    min: 0,
    splitNumber: 10,
    minorTick: {
      show: true,
    },
    minorSplitLine: {
      show: true,
    },
  },
  yAxis: {
    nameRotate: 90,
    nameLocation: 'middle',
    nameGap: 70,
    min: 0,
    splitNumber: 3,
    minorTick: {
      show: true,
    },
    minorSplitLine: {
      show: true,
    },
  },
  dataZoom: [
    {
      show: true,
      type: 'inside',
      filterMode: 'none',
      xAxisIndex: [0],
    },
    {
      show: true,
      type: 'inside',
      filterMode: 'none',
      yAxisIndex: [0],
    },
  ],
};

export const fullChartConfig = (tensionCalculations) => {
  const chartOptions = JSON.parse(JSON.stringify(BASE_CHART_OPTIONS));

  chartOptions.title.text = `${
    tensionCalculations.pipeNominalSize
  }", Cross Section Area - ${tensionCalculations.crossSectionArea.toFixed(
    2
  )} [${UNITS.in2}], Inertia - ${tensionCalculations.inertia.toFixed(2)} [${
    UNITS.in4
  }]`;
  chartOptions.title.subtext = 'DP COMBINEDLOAD CHART - NO BLOCK WEIGHT';
  chartOptions.xAxis.name = `Torque (${tensionCalculations.torqueUnits})`;
  chartOptions.yAxis.name = `Tension (${tensionCalculations.tensionUnits})`;
  chartOptions.series = [
    {
      name: '100% Premium',
      type: 'line',
      showSymbol: false,
      smooth: true,
      data: tensionCalculations.seria,
    },
    {
      name: `${tensionCalculations.safetyFactor}% Premium`,
      type: 'line',
      showSymbol: false,
      smooth: true,
      data: tensionCalculations.seriaWithSafetyFactor,
    },
  ];

  return chartOptions;
};
