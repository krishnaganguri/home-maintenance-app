import { detectApplianceType } from "./applianceIntelligence";

export function parseOCRResult1(text: string) {
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

export function parseOCRResult(
  text: string = ""
) {
  const cleaned = text
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const upper = cleaned.toUpperCase();

  const brands = [
    "GE",
    "SAMSUNG",
    "LG",
    "WHIRLPOOL",
    "FRIGIDAIRE",
    "BOSCH",
    "MAYTAG",
    "KITCHENAID",
    "CARRIER",
  ];

  let brand = "";

  for (const b of brands) {
    if (upper.includes(b)) {
      brand = b;
      break;
    }
  }

  const modelMatch =
    upper.match(
      /MODEL[:\s]*([A-Z0-9\-]{5,})/
    ) ||
    upper.match(
      /MOD[:\s]*([A-Z0-9\-]{5,})/
    );

  const serialMatch =
    upper.match(
      /SERIAL[:\s]*([A-Z0-9\-]{5,})/
    ) ||
    upper.match(
      /SER[:\s]*([A-Z0-9\-]{5,})/
    );

  let type = "";

  if (upper.includes("DISHWASHER")) {
    type = "dishwasher";
  } else if (
    upper.includes("REFRIGERATOR")
  ) {
    type = "refrigerator";
  } else if (upper.includes("WASHER")) {
    type = "washer";
  } else if (upper.includes("DRYER")) {
    type = "dryer";
  } else if (upper.includes("HVAC")) {
    type = "hvac";
  }

  return {
    brand,
    model:
      modelMatch?.[1] || "",
    serial:
      serialMatch?.[1] || "",
    type,
  };
}