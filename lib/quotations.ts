import fs from "fs";
import path from "path";
import { Quotation } from "@/types/quotation";
import { getPrivateDataPath } from "@/lib/paths";

function getFilePath() {
  return getPrivateDataPath("quotations.json");
}

function ensureDataDir() {
  const filePath = getFilePath();
  const dataDir = path.dirname(filePath);

  if (
    !fs.existsSync(
      /* turbopackIgnore: true */ dataDir
    )
  ) {
    fs.mkdirSync(
      /* turbopackIgnore: true */ dataDir,
      {
        recursive: true,
      }
    );
  }
}


export function getQuotations(): Quotation[] {
  const filePath = getFilePath();

  if (
    !fs.existsSync(
      /* turbopackIgnore: true */ filePath
    )
  ) {
    return [];
  }

  try {
    const file = fs.readFileSync(
      /* turbopackIgnore: true */ filePath,
      "utf-8"
    ).replace(/^\uFEFF/, "").trim();

    if (!file) {
      return [];
    }

    const data = JSON.parse(file);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error loading quotations from:", filePath, error);
    return [];
  }
}

export function saveQuotations(
  quotations: Quotation[]
) {
  ensureDataDir();

  const filePath = getFilePath();

  fs.writeFileSync(
    /* turbopackIgnore: true */ filePath,
    JSON.stringify(
      quotations,
      null,
      2
    ),
    "utf-8"
  );
}

export function createQuotation(
  data: Omit<
    Quotation,
    | "id"
    | "quotationNumber"
    | "createdAt"
    | "updatedAt"
  >
): Quotation {
  const quotations =
    getQuotations();

  const nextNumber =
    quotations.length + 1;

  const quotationNumber =
    `GNF-Q-${String(
      nextNumber
    ).padStart(4, "0")}`;

  const now =
    new Date().toISOString();

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
  const quotations =
    getQuotations();

  const index =
    quotations.findIndex(
      (quotation) =>
        quotation.id === id
    );

  if (index === -1) {
    return null;
  }

  quotations[index] = {
    ...quotations[index],
    ...data,
    updatedAt:
      new Date().toISOString(),
  };

  saveQuotations(quotations);

  return quotations[index];
}

export function deleteQuotation(
  id: string
) {
  const quotations =
    getQuotations();

  const filtered =
    quotations.filter(
      (quotation) =>
        quotation.id !== id
    );

  if (
    filtered.length ===
    quotations.length
  ) {
    return false;
  }

  saveQuotations(filtered);

  return true;
}