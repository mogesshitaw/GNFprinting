export interface QuotationItem {
  id: string;
  serviceId: number;
  service: string;
  description: string;
  pricingType: "fixed" | "quantity" | "area" | "volume";
  quantity: number;
  width?: number;
  height?: number;
  depth?: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;

  customerName: string;
  contactPerson: string;
  phone: string;
  email: string;

  projectTitle: string;

  issueDate: string;
  validUntil: string;

  deliveryTime: string;
  paymentTerms: string;
  notes: string;

  items: QuotationItem[];

  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;

  status: "draft" | "sent" | "accepted" | "rejected";

  createdAt: string;
  updatedAt: string;
}