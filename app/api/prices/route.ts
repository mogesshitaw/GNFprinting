import { NextRequest, NextResponse } from "next/server";

import {
  getPrices,
  addPrice,
  updatePrice,
  deletePrice,
} from "@/lib/prices";

export async function GET() {
  try {
    const prices = getPrices();

    return NextResponse.json(prices);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load prices",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    if (
      !body.service ||
      !body.pricingType ||
      body.unitPrice === undefined ||
      !body.unit
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const unitPrice = Number(body.unitPrice);

    if (
      Number.isNaN(unitPrice) ||
      unitPrice < 0
    ) {
      return NextResponse.json(
        {
          error: "Invalid unit price",
        },
        {
          status: 400,
        }
      );
    }

    const newPrice = addPrice({
      service: body.service,
      description: body.description || "",
      pricingType: body.pricingType,
      unitPrice,
      unit: body.unit,
    });

    return NextResponse.json(
      newPrice,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create price",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: NextRequest
) {
  try {
    const body = await request.json();

    if (
      !body.id ||
      !body.service ||
      !body.pricingType ||
      body.unitPrice === undefined ||
      !body.unit
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const unitPrice = Number(body.unitPrice);

    if (
      Number.isNaN(unitPrice) ||
      unitPrice < 0
    ) {
      return NextResponse.json(
        {
          error: "Invalid unit price",
        },
        {
          status: 400,
        }
      );
    }

    const updatedPrice = updatePrice(
      Number(body.id),
      {
        service: body.service,
        description: body.description || "",
        pricingType: body.pricingType,
        unitPrice,
        unit: body.unit,
      }
    );

    if (!updatedPrice) {
      return NextResponse.json(
        {
          error: "Price not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(updatedPrice);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update price",
      },
      {
        status: 500,
      }
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
        {
          error: "ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const deleted = deletePrice(Number(id));

    if (!deleted) {
      return NextResponse.json(
        {
          error: "Price not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: "Price deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete price",
      },
      {
        status: 500,
      }
    );
  }
}