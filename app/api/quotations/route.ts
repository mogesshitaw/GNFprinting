import { NextRequest, NextResponse } from "next/server";
import {
  getQuotations,
  createQuotation,
  updateQuotation,
  deleteQuotation,
} from "@/lib/quotations";

export async function GET() {
  try {
    const quotations = getQuotations();

    return NextResponse.json(quotations);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load quotations." },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    if (!body.customerName) {
      return NextResponse.json(
        { error: "Customer name is required." },
        { status: 400 }
      );
    }

    if (
      !body.items ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        { error: "At least one quotation item is required." },
        { status: 400 }
      );
    }

    const quotation = createQuotation({
      customerName: body.customerName,
      contactPerson: body.contactPerson || "",
      phone: body.phone || "",
      email: body.email || "",

      projectTitle: body.projectTitle || "",

      issueDate:
        body.issueDate ||
        new Date().toISOString().split("T")[0],

      validUntil: body.validUntil || "",

      deliveryTime: body.deliveryTime || "",
      paymentTerms: body.paymentTerms || "",
      notes: body.notes || "",

      items: body.items,

      subtotal: Number(body.subtotal) || 0,
      discount: Number(body.discount) || 0,
      tax: Number(body.tax) || 0,
      grandTotal: Number(body.grandTotal) || 0,

      status: body.status || "draft",
    });

    return NextResponse.json(
      quotation,
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create quotation." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest
) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Quotation ID is required." },
        { status: 400 }
      );
    }

    const quotation = updateQuotation(
      body.id,
      body
    );

    if (!quotation) {
      return NextResponse.json(
        { error: "Quotation not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(quotation);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update quotation." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Quotation ID is required." },
        { status: 400 }
      );
    }

    const deleted = deleteQuotation(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Quotation not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete quotation." },
      { status: 500 }
    );
  }
}