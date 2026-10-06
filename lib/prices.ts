import fs from "fs";
import path from "path";
import { Price } from "@/types/price";
import { getPublicDataPath } from "@/lib/paths";

function getPricesFilePath() {
  return getPublicDataPath("prices.json");
}

function ensureDataDirectory() {
  const filePath = getPricesFilePath();
  const dataDirectory = path.dirname(filePath);

  fs.mkdirSync(dataDirectory, {
    recursive: true,
  });
}


export function getPrices(): Price[] {
  const filePath =
    getPricesFilePath();

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const file = fs.readFileSync(
      filePath,
      "utf-8"
    ).replace(/^\uFEFF/, "").trim();

    if (!file) {
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
  } catch (error) {
    console.error("Error loading prices from:", filePath, error);
    return [];
  }
}

export function savePrices(
  prices: Price[]
) {
  ensureDataDirectory();

  const filePath =
    getPricesFilePath();

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
      ? Math.max(
          ...prices.map((p) => p.id)
        ) + 1
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

export function deletePrice(
  id: number
) {
  const prices = getPrices();

  const filtered = prices.filter(
    (price) => price.id !== id
  );

  if (
    filtered.length ===
    prices.length
  ) {
    return false;
  }

  savePrices(filtered);

  return true;
}