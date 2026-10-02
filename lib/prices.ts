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

  if (!file.trim()) {
    return [];
  }

  const data = JSON.parse(file);

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((price) => ({
    ...price,
    images: Array.isArray(price.images)
      ? price.images
      : [],
  }));
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

  const nextId =
    prices.length > 0
      ? Math.max(...prices.map((p) => p.id)) + 1
      : 1;

  const price: Price = {
    id: nextId,
    ...data,
    images: data.images || [],
  };

  prices.push(price);

  savePrices(prices);

  return price;
}

export function updatePrice(
  id: number,
  data: Partial<Omit<Price, "id">>
) {
  const prices = getPrices();

  const index = prices.findIndex(
    (price) => price.id === id
  );

  if (index === -1) {
    return null;
  }

  prices[index] = {
    ...prices[index],
    ...data,
    images:
      data.images !== undefined
        ? data.images
        : prices[index].images || [],
  };

  savePrices(prices);

  return prices[index];
}

export function deletePrice(id: number) {
  const prices = getPrices();

  const filtered = prices.filter(
    (price) => price.id !== id
  );

  if (filtered.length === prices.length) {
    return false;
  }

  savePrices(filtered);

  return true;
}