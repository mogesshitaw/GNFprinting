import fs from "fs";
import path from "path";
import { Price } from "@/types/price";

const filePath = path.join(
  process.cwd(),
  "data",
  "prices.json"
);

export function getPrices(): Price[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const file = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(file);
}

export function savePrices(prices: Price[]) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(prices, null, 2),
    "utf-8"
  );
}

export function addPrice(
  data: Omit<Price, "id">
): Price {
  const prices = getPrices();

  const newId =
    prices.length > 0
      ? Math.max(
          ...prices.map((price) => price.id)
        ) + 1
      : 1;

  const newPrice: Price = {
    id: newId,
    ...data,
  };

  prices.push(newPrice);

  savePrices(prices);

  return newPrice;
}

export function updatePrice(
  id: number,
  data: Omit<Price, "id">
) {
  const prices = getPrices();

  const index = prices.findIndex(
    (price) => price.id === id
  );

  if (index === -1) {
    return null;
  }

  prices[index] = {
    id,
    ...data,
  };

  savePrices(prices);

  return prices[index];
}

export function deletePrice(id: number) {
  const prices = getPrices();

  const filteredPrices = prices.filter(
    (price) => price.id !== id
  );

  if (filteredPrices.length === prices.length) {
    return false;
  }

  savePrices(filteredPrices);

  return true;
}