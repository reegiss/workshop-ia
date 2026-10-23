import { describe, it, expect } from "vitest";
import { banks } from "./banks";
import {
  calculateFee, searchBanks, sortByFee,
} from "./bankSearch";

const blueBank = banks[0];
const names = (list: { name: string }[]) =>
  list.map((b) => b.name);

describe("calculateFee", () => {
  it("charges lowFee up to the limit", () => {
    const fee = calculateFee(blueBank, 1000);
    expect(fee).toBe(2);
  });

  it("charges highFee above the limit", () => {
    const fee = calculateFee(blueBank, 1000.01);
    expect(fee).toBe(5);
  });
});

describe("searchBanks", () => {
  it("ignores case", () => {
    const found = searchBanks(banks, "AZUL");
    expect(names(found)).toEqual(["Banco Azul"]);
  });

  it("ignores accents", () => {
    const found = searchBanks(banks, "ambar");
    expect(names(found)).toEqual(["Banco Âmbar"]);
  });

  it("finds the exact code", () => {
    const found = searchBanks(banks, "001");
    expect(names(found)).toEqual(["Banco Azul"]);
  });

  it("does not match part of a code", () => {
    expect(searchBanks(banks, "1")).toEqual([]);
  });

  it("finds all banks for an empty term", () => {
    expect(searchBanks(banks, "")).toHaveLength(3);
  });
});

describe("sortByFee", () => {
  it("sorts by fee, then by name", () => {
    const all = searchBanks(banks, "");
    expect(names(sortByFee(all, 500))).toEqual([
      "Banco Âmbar", "Banco Azul", "Banco Verde",
    ]);
  });
});
