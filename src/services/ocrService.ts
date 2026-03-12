export async function scanApplianceLabel(photoUri: string) {
    console.log("Scanning appliance label at: ", photoUri);
  const formData = new FormData();

  formData.append("image", {
    uri: photoUri,
    type: "image/jpeg",
    name: "label.jpg",
  } as any);

  console.log("Sending image to OCR API...: ", formData);
  const response = await fetch("http://192.168.1.123:4000/ocr", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log("OCR API Response: ", data);

  return data.text;
}