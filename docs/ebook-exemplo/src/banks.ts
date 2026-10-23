export type Bank = {
  code: string;
  name: string;
  lowFee: number;
  highFee: number;
};

export const FEE_RANGE_LIMIT = 1000;

export const banks: Bank[] = [
  { code: "001", name: "Banco Azul",
    lowFee: 2, highFee: 5 },
  { code: "012", name: "Banco Verde",
    lowFee: 3, highFee: 4 },
  { code: "123", name: "Banco Âmbar",
    lowFee: 2, highFee: 6 },
];
