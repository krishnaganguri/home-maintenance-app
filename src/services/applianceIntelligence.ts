export function detectApplianceType(brand: string, model: string) {
  const value = `${brand} ${model}`.toLowerCase();

  if (
    value.includes("rf") ||
    value.includes("fridge") ||
    value.includes("refrigerator")
  ) {
    return "refrigerator";
  }

  if (
    value.includes("dw") ||
    value.includes("dishwasher")
  ) {
    return "dishwasher";
  }

  if (
    value.includes("wt") ||
    value.includes("washer")
  ) {
    return "washer";
  }

  if (
    value.includes("dryer")
  ) {
    return "dryer";
  }

  if (
    value.includes("hvac") ||
    value.includes("carrier")
  ) {
    return "hvac";
  }

  return "";
}