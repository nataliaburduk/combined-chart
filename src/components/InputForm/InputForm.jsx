import { useEffect, useState } from 'react';
import { SelectBox } from './SelectBox.jsx';
import { UNITS } from '../../utils/units.js';
import {
  pipeSizes,
  additionalOptions,
  safetyFactorOptions,
  torqueUnitOptions,
  tensionUnitOptions,
} from './selectorsOptions.js';
import './styles.css';

export const InputForm = ({
  setChartData,
  setCalculationsUpToDate,
  isCalculationUpToDate,
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWallThickness, setSelectedWallThickness] = useState(null);
  const [selectedSafetyFactor, setSelectedSafetyFactor] = useState(
    safetyFactorOptions[0]
  );
  const [selectedTorqueUnit, setSelectedTorqueUnit] = useState(
    torqueUnitOptions[0]
  );
  const [selectedTensionUnit, setSelectedTensionUnit] = useState(
    tensionUnitOptions[0]
  );

  useEffect(() => {
    setCalculationsUpToDate(false);
  }, [
    selectedSize,
    selectedWallThickness,
    selectedSafetyFactor,
    selectedTorqueUnit,
    selectedTensionUnit,
  ]);

  const isValid = () =>
    selectedSize &&
    selectedWallThickness &&
    selectedSafetyFactor &&
    selectedTorqueUnit &&
    selectedTensionUnit;

  const handleCalculate = () => {
    if (isValid()) {
      setChartData({
        pipeNominalSize: selectedSize.value,
        wallThickness: selectedWallThickness.value,
        minYieldStrength:
          additionalOptions[selectedSize.label].minYieldStrength,
        safetyFactor: selectedSafetyFactor.value,
        torqueUnits: selectedTorqueUnit.value,
        tensionUnits: selectedTensionUnit.value,
      });
      setCalculationsUpToDate(true);
    }
  };

  const handleSizeChange = (event) => {
    const selected = pipeSizes.find(
      (size) => size.value.toString() === event.target.value
    );
    setSelectedSize(selected);
    setSelectedWallThickness(null);
  };

  const handleWallThicknessChange = (event) => {
    const selected = additionalOptions[
      selectedSize.label
    ].wallThicknessOptions.find(
      (option) => option.value.toString() === event.target.value
    );
    setSelectedWallThickness(selected);
  };

  const handleSafetyFactorChange = (event) => {
    const selected = safetyFactorOptions.find(
      (option) => option.value.toString() === event.target.value
    );
    setSelectedSafetyFactor(selected);
  };

  const handleTorqueUnitChange = (event) => {
    const selected = torqueUnitOptions.find(
      (option) => option.value.toString() === event.target.value
    );
    setSelectedTorqueUnit(selected);
  };

  const handleTensionUnitChange = (event) => {
    const selected = tensionUnitOptions.find(
      (option) => option.value.toString() === event.target.value
    );
    setSelectedTensionUnit(selected);
  };

  return (
    <>
      <div className="combo-box">
        <SelectBox
          label="Pipe Nominal Size"
          options={pipeSizes}
          value={selectedSize ? selectedSize.value : ''}
          onChange={handleSizeChange}
          units={UNITS.in}
        />

        <SelectBox
          className={!selectedSize ? 'not-up-to-date' : ''}
          label="Wall Thickness"
          options={additionalOptions[selectedSize?.label]?.wallThicknessOptions}
          value={selectedWallThickness ? selectedWallThickness.value : ''}
          onChange={handleWallThicknessChange}
          units={UNITS.lbDivFt}
          disabled={!selectedSize}
        />
        <div className={`select-box ${!selectedSize ? 'not-up-to-date' : ''}`}>
          Minimum Yield Strength{' '}
          <p>{additionalOptions[selectedSize?.label]?.minYieldStrength}</p>
          psi
        </div>

        {selectedWallThickness && (
          <>
            <SelectBox
              label="Safety Factor"
              options={safetyFactorOptions}
              value={selectedSafetyFactor ? selectedSafetyFactor.value : ''}
              onChange={handleSafetyFactorChange}
              units={UNITS.percents}
            />

            <SelectBox
              label="Torque Unit"
              options={torqueUnitOptions}
              value={selectedTorqueUnit ? selectedTorqueUnit.value : ''}
              onChange={handleTorqueUnitChange}
            />

            <SelectBox
              label="Tension Unit"
              options={tensionUnitOptions}
              value={selectedTensionUnit ? selectedTensionUnit.value : ''}
              onChange={handleTensionUnitChange}
            />
          </>
        )}
      </div>
      <button
        onClick={handleCalculate}
        disabled={isCalculationUpToDate || !isValid()}
      >
        Calculate
      </button>
    </>
  );
};
