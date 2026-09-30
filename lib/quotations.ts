import fs from "fs";
import path from "path";
import { Quotation } from "@/types/quotation";

const filePath = path.join(
  process.cwd(),
  "data",
  "quotations.json"
);

export function getQuotations(): Quotation[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const file = fs.readFileSync(filePath, "utf-8");

  if (!file.trim()) {
    return [];
  }

  return JSON.parse(file);
}

export function saveQuotations(
  quotations: Quotation[]
) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(quotations, null, 2),
    "utf-8"
  );
}

export function createQuotation(
  data: Omit<
    Quotation,
    "id" | "quotationNumber" | "createdAt" | "updatedAt"
  >
): Quotation {
  const quotations = getQuotations();

  const nextNumber = quotations.length + 1;

  const quotationNumber = `GNF-Q-${String(
    nextNumber
  ).padStart(4, "0")}`;

  const now = new Date().toISOString();

  const quotation: Quotation = {
    id: crypto.randomUUID(),
    quotationNumber,
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  quotations.push(quotation);

  saveQuotations(quotations);

  return quotation;
}

export function updateQuotation(
  id: string,
  data: Partial<Quotation>
) {
  const quotations = getQuotations();

  const index = quotations.findIndex(
    (quotation) => quotation.id === id
  );

  if (index === -1) {
    return null;
  }

  quotations[index] = {
    ...quotations[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  saveQuotations(quotations);

  return quotations[index];
}

export function deleteQuotation(id: string) {
  const quotations = getQuotations();

  const filtered = quotations.filter(
    (quotation) => quotation.id !== id
  );

  if (filtered.length === quotations.length) {
    return false;
  }

  saveQuotations(filtered);

  return true;
}