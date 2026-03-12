import { compressImage } from "./imageService";
import { parseOCRResult } from "./ocrParserService";
import { scanApplianceLabel } from "./ocrService";

export async function processApplianceScan(photoUri: string) {
  const compressedUri = await compressImage(photoUri);
  const text = await scanApplianceLabel(compressedUri);
  console.log("OCR Result: ", text);
  const parsedData = parseOCRResult(text);
  console.log("Parsed Data: ", parsedData);
  return parsedData;
}