import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  getPrices,
  addPrice,
  updatePrice,
  deletePrice,
} from "@/lib/prices";

interface UploadedImage {
  name: string;
  dataUrl: string;
}

const MAX_IMAGES = 20;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-");
}

function saveUploadedImages(
  serviceName: string,
  uploadedImages: UploadedImage[]
): string[] {
  if (!uploadedImages.length) {
    return [];
  }

  const folderName =
    `${slugify(serviceName)}-${Date.now()}`;

  const folderPath = path.join(
    process.cwd(),
    "public",
    "images",
    "services",
    folderName
  );

  fs.mkdirSync(folderPath, {
    recursive: true,
  });

  const savedPaths: string[] = [];

  uploadedImages.forEach((image, index) => {
    if (!image.dataUrl) {
      return;
    }

    const match = image.dataUrl.match(
      /^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/
    );

    if (!match) {
      throw new Error(
        `Invalid image format for ${image.name}`
      );
    }

    const extensionFromMime =
      match[1].toLowerCase();

    const extension =
      extensionFromMime === "jpeg"
        ? ".jpg"
        : `.${extensionFromMime}`;

    if (
      !allowedExtensions.includes(extension)
    ) {
      throw new Error(
        `Unsupported image format: ${extension}`
      );
    }

    const buffer = Buffer.from(
      match[2],
      "base64"
    );

    if (buffer.length > MAX_IMAGE_SIZE) {
      throw new Error(
        `${image.name} is larger than 5MB.`
      );
    }

    const originalName = path.basename(
      image.name || `image-${index + 1}`
    );

    const baseName = path.basename(
      originalName,
      path.extname(originalName)
    );

    const fileName =
      `${safeFileName(baseName) || "image"}-${index + 1}${extension}`;

    const filePath = path.join(
      folderPath,
      fileName
    );

    fs.writeFileSync(filePath, buffer);

    savedPaths.push(
      `/images/services/${folderName}/${fileName}`
    );
  });

  return savedPaths;
}

function deleteImageFile(imagePath: string) {
  if (!imagePath.startsWith("/images/services/")) {
    return;
  }

  const relativePath = imagePath.replace(
    /^\/+/,
    ""
  );

  const fullPath = path.join(
    process.cwd(),
    "public",
    relativePath
  );

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}

export async function GET() {
  try {
    const prices = getPrices();

    return NextResponse.json(prices);
  } catch {
    return NextResponse.json(
      {
        error: "Failed to load prices.",
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

    const {
      service,
      description,
      pricingType,
      unitPrice,
      unit,
      images = [],
      uploadedImages = [],
    } = body;

    if (!service?.trim()) {
      return NextResponse.json(
        {
          error: "Service name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!pricingType) {
      return NextResponse.json(
        {
          error: "Pricing type is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!unit?.trim()) {
      return NextResponse.json(
        {
          error: "Unit is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Array.isArray(uploadedImages) ||
      uploadedImages.length > MAX_IMAGES
    ) {
      return NextResponse.json(
        {
          error: `You can upload up to ${MAX_IMAGES} images.`,
        },
        {
          status: 400,
        }
      );
    }

    const newImages = saveUploadedImages(
      service,
      uploadedImages
    );

    const price = addPrice({
      service: service.trim(),
      description:
        description?.trim() || "",
      images: [
        ...(Array.isArray(images)
          ? images
          : []),
        ...newImages,
      ],
      pricingType,
      unitPrice: Number(unitPrice) || 0,
      unit: unit.trim(),
    });

    return NextResponse.json(
      price,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create price.",
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

    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        {
          error: "Price ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const existingPrices = getPrices();

    const existing = existingPrices.find(
      (price) => price.id === id
    );

    if (!existing) {
      return NextResponse.json(
        {
          error: "Price not found.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      service,
      description,
      pricingType,
      unitPrice,
      unit,
      images = [],
      uploadedImages = [],
    } = body;

    if (!service?.trim()) {
      return NextResponse.json(
        {
          error: "Service name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Array.isArray(images) ||
      !Array.isArray(uploadedImages)
    ) {
      return NextResponse.json(
        {
          error: "Invalid image data.",
        },
        {
          status: 400,
        }
      );
    }

    const totalImages =
      images.length + uploadedImages.length;

    if (totalImages > MAX_IMAGES) {
      return NextResponse.json(
        {
          error: `You can have up to ${MAX_IMAGES} images per service.`,
        },
        {
          status: 400,
        }
      );
    }

    const newImages = saveUploadedImages(
      service,
      uploadedImages
    );

    const finalImages = [
      ...images,
      ...newImages,
    ];

    const oldImages =
      existing.images || [];

    const removedImages =
      oldImages.filter(
        (oldImage) =>
          !finalImages.includes(oldImage)
      );

    removedImages.forEach(
      deleteImageFile
    );

    const updated = updatePrice(id, {
      service: service.trim(),
      description:
        description?.trim() || "",
      images: finalImages,
      pricingType,
      unitPrice: Number(unitPrice) || 0,
      unit: unit.trim(),
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update price.",
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
    const body = await request.json();

    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        {
          error: "Price ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const prices = getPrices();

    const existing = prices.find(
      (price) => price.id === id
    );

    if (!existing) {
      return NextResponse.json(
        {
          error: "Price not found.",
        },
        {
          status: 404,
        }
      );
    }

    existing.images?.forEach(
      deleteImageFile
    );

    const deleted = deletePrice(id);

    if (!deleted) {
      return NextResponse.json(
        {
          error: "Failed to delete price.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete price.",
      },
      {
        status: 500,
      }
    );
  }
}