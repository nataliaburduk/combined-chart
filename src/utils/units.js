export const UNITS = {
  ftlb: 'ft*lb',
  kftlb: 'kft*lb',
  kNm: 'kNm',
  lb: 'lb',
  klb: 'klb',
  mT: 'mT',
  lbDivFt: 'lb/ft',
  percents: '%',
  in: '"',
  in2: 'in^2',
  in4: 'in^4',
};

export const DEFAULT_TORQUE_UNIT = UNITS.ftlb;
export const DEFAULT_TENSION_UNIT = UNITS.lb;

export const TORQUE_UNIT_CONVERTER = {
  [UNITS.ftlb]: 1,
  [UNITS.kftlb]: 0.001,
  [UNITS.kNm]: 0.00136,
};

export const TENSION_UNIT_CONVERTER = {
  [UNITS.lb]: 1,
  [UNITS.klb]: 0.001,
  [UNITS.mT]: 0.000453592,
};
