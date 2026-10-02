export type PricingType =
  | "fixed"
  | "quantity"
  | "area"
  | "volume";

export interface Price {
  id: number;
  service: string;
  description: string;
  images: string[];

  /**
   * How this service is priced.
   */
  pricingType: PricingType;

  /**
   * Price for one unit.
   *
   * Example:
   * 350 ETB per m²
   * 5 ETB per piece
   */
  unitPrice: number;

  /**
   * Measurement unit.
   *
   * Examples:
   * piece, m, m2, m3, kg, g, sheet
   */
  unit: string;
}