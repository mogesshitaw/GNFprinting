import fs from "fs";
import path from "path";

// 1. Copy .next/static
const staticSource = path.join(
  process.cwd(),
  ".next",
  "static"
);

const staticDestination = path.join(
  process.cwd(),
  ".next",
  "standalone",
  ".next",
  "static"
);

if (!fs.existsSync(staticSource)) {
  console.error("❌ .next/static was not found.");
  process.exit(1);
}

fs.mkdirSync(
  path.dirname(staticDestination),
  { recursive: true }
);

fs.cpSync(
  staticSource,
  staticDestination,
  { recursive: true }
);

console.log("✅ Next.js static files copied:");
console.log(staticDestination);

// 2. Copy public directory
const publicSource = path.join(
  process.cwd(),
  "public"
);

const publicDestination = path.join(
  process.cwd(),
  ".next",
  "standalone",
  "public"
);

if (fs.existsSync(publicSource)) {
  fs.mkdirSync(
    path.dirname(publicDestination),
    { recursive: true }
  );

  fs.cpSync(
    publicSource,
    publicDestination,
    { recursive: true }
  );

  console.log("✅ Next.js public files copied:");
  console.log(publicDestination);
}