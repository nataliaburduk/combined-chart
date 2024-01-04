import {
  DEFAULT_TENSION_UNIT,
  DEFAULT_TORQUE_UNIT,
  TORQUE_UNIT_CONVERTER,
  TENSION_UNIT_CONVERTER,
} from './units';

export const momentOfInertia = (outsideDiameter, insideDiameter) => {
  return (
    (Math.PI * (Math.pow(outsideDiameter, 4) - Math.pow(insideDiameter, 4))) /
    32
  );
};

export const maxAllowableTension = (
  crossSectionArea,
  torque,
  outsideDiameter,
  yieldStrength,
  momentOfInertia
) => {
  return (
    crossSectionArea *
    Math.sqrt(
      Math.pow(yieldStrength, 2) -
        Math.pow((torque * outsideDiameter) / (0.09167 * momentOfInertia), 2)
    )
  );
};

export const tensionWithSafetyFactor = (tension, safetyFactor) => {
  return (1 - safetyFactor / 100) * tension;
};

export const convertDefaultTorque = (ftlb, units) =>
  ftlb * TORQUE_UNIT_CONVERTER[units];
export const convertDefaultTention = (lb, units) =>
  lb * TENSION_UNIT_CONVERTER[units];

export const tensionChartData = (
  pipeNominalSize,
  wallThickness,
  minYieldStrength,
  safetyFactor,
  torqueUnits = DEFAULT_TORQUE_UNIT,
  tensionUnits = DEFAULT_TENSION_UNIT
) => {
  const crossSectionArea = Math.PI * Math.pow(pipeNominalSize / 2, 2);
  const outsideDiameter = pipeNominalSize + wallThickness * 2;
  const inertia = momentOfInertia(outsideDiameter, pipeNominalSize);
  const lastTorque = (minYieldStrength * 0.09167 * inertia) / outsideDiameter;

  const dots = [];

  const torqueStep = 1000;

  let xCurrent = 0;
  let yCurrent = 0;

  do {
    yCurrent = maxAllowableTension(
      crossSectionArea,
      xCurrent,
      outsideDiameter,
      minYieldStrength,
      inertia
    );

    dots.push([
      convertDefaultTorque(xCurrent, torqueUnits),
      convertDefaultTention(yCurrent, tensionUnits),
    ]);

    xCurrent += torqueStep;
  } while (xCurrent < lastTorque);

  dots.push([convertDefaultTorque(lastTorque, torqueUnits), 0]);

  const seriaWithSafetyFactor = dots.map((dot) => [
    dot[0],
    tensionWithSafetyFactor(dot[1], safetyFactor),
  ]);

  return {
    pipeNominalSize,
    safetyFactor,
    crossSectionArea,
    inertia,
    torqueUnits,
    tensionUnits,
    seriaWithSafetyFactor,
    seria: dots,
  };
};
