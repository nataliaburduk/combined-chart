import { UNITS } from '../../utils/units';

export const pipeSizes = [
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 5.875, label: '5 7/8' },
];

export const additionalOptions = {
  4: {
    wallThicknessOptions: [
      { value: 0.33, label: '14.0' },
      { value: 0.38, label: '15.7' },
      { value: 0.5, label: '19.56' },
    ],
    minYieldStrength: 135000,
  },
  5: {
    wallThicknessOptions: [
      { value: 0.362, label: '19.5' },
      { value: 0.5, label: '25.6' },
      { value: 0.75, label: '34.01' },
    ],
    minYieldStrength: 135000,
  },
  '5 7/8': {
    wallThicknessOptions: [
      { value: 0.361, label: '23.4' },
      { value: 0.415, label: '26.3' },
      { value: 0.5, label: '28.7' },
      { value: 0.625, label: '34.21' },
      { value: 0.75, label: '41.05' },
    ],
    minYieldStrength: 95000,
  },
};

export const safetyFactorOptions = Array.from({ length: 19 }, (_, index) => ({
  value: index * 5,
  label: index * 5,
}));

export const torqueUnitOptions = [
  { value: UNITS.kNm, label: 'kNm' },
  { value: UNITS.kftlb, label: 'kftlb' },
];

export const tensionUnitOptions = [
  { value: UNITS.mT, label: 'mT' },
  { value: UNITS.klb, label: 'klb' },
];
