import { useEffect, useState } from 'react';
import { InputForm } from './components/InputForm/InputForm';
import { Chart } from './components/Chart/Chart';
import './App.css';

function App() {
  const [isCalculationUpToDate, setCalculationsUpToDate] = useState(false);
  const [isChartInitialized, setisChartInitialized] = useState(false);
  const [chartData, setChartData] = useState({
    pipeNominalSize: null,
    wallThickness: null,
    minYieldStrength: null,
    safetyFactor: null,
    torqueUnits: null,
    tensionUnits: null,
  });

  useEffect(() => {
    !isChartInitialized && isCalculationUpToDate && setisChartInitialized(true);
  }, [isCalculationUpToDate]);

  return (
    <div className="wrapper">
      <h1>COMBINED LOADING CHART</h1>
      <InputForm
        setChartData={setChartData}
        setCalculationsUpToDate={setCalculationsUpToDate}
        isCalculationUpToDate={isCalculationUpToDate}
      />
      {isChartInitialized && (
        <>
          <div className="calculations-result">
            {isCalculationUpToDate
              ? 'Calculations up to date'
              : 'Calculations NOT up to date'}
          </div>
          <Chart {...chartData} upToDate={isCalculationUpToDate} />
        </>
      )}
    </div>
  );
}

export default App;
