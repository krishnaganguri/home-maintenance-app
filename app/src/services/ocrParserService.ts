import { detectApplianceType } from "./applianceIntelligence";

export function parseOCRResult(text: string) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let brand = "";
  let model = "";
  let serial = "";
  let type = "";

  for (const line of lines) {
    const lower = line.toLowerCase();

    // ---------- BRAND ----------
    if (
      lower.includes("samsung") ||
      lower.includes("lg") ||
      lower.includes("whirlpool") ||
      lower.includes("ge appliances") ||
      lower.includes("bosch") ||
      lower.includes("carrier")
    ) {
      brand = line;
    }

    // ---------- MODEL ----------
    if (lower.includes("model")) {
      model = line
        .replace(/model/i, "")
        .replace(/[:\-]/g, "")
        .trim();
    }

    // ---------- SERIAL ----------
    if (lower.includes("serial")) {
      serial = line
        .replace(/serial/i, "")
        .replace(/[:\-]/g, "")
        .trim();
    }

    // ---------- TYPE ----------
    if (lower.includes("dishwasher")) {
      type = "dishwasher";
    }

    if (lower.includes("refrigerator")) {
      type = "refrigerator";
    }

    if (lower.includes("washer")) {
      type = "washer";
    }

    if (lower.includes("dryer")) {
      type = "dryer";
    }

    if (lower.includes("hvac")) {
      type = "hvac";
    }
  }

  // fallback type detection from brand + model
  if (!type) {
    type = detectApplianceType(brand, model);
  }

  return {
    brand,
    model,
    serial,
    type,
  };
}