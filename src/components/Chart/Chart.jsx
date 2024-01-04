import ReactECharts from 'echarts-for-react';
import { tensionChartData } from '../../utils/calculations';
import { fullChartConfig } from './configuration';

export const Chart = ({
  pipeNominalSize,
  wallThickness,
  minYieldStrength,
  safetyFactor,
  torqueUnits,
  tensionUnits,
  upToDate,
}) => {
  const tensionCalculations = tensionChartData(
    pipeNominalSize,
    wallThickness,
    minYieldStrength,
    safetyFactor,
    torqueUnits,
    tensionUnits
  );

  return (
    <ReactECharts
      option={fullChartConfig(tensionCalculations)}
      className={!upToDate ? 'not-up-to-date' : ''}
    />
  );
};
