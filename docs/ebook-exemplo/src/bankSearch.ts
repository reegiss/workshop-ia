import { type Bank, FEE_RANGE_LIMIT } from "./banks";

export function calculateFee(
  bank: Bank, amount: number
): number {
  return amount <= FEE_RANGE_LIMIT
    ? bank.lowFee
    : bank.highFee;
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function searchBanks(
  banks: Bank[], term: string
): Bank[] {
  const t = normalize(term);
  return banks.filter((b) =>
    normalize(b.name).includes(t) ||
    b.code === term
  );
}

export function sortByFee(
  banks: Bank[], amount: number
): Bank[] {
  return [...banks].sort((a, b) =>
    calculateFee(a, amount) -
      calculateFee(b, amount) ||
    a.name.localeCompare(b.name, "pt-BR")
  );
}
