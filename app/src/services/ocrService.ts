export async function scanApplianceLabel(photoUri: string) {
    console.log("Scanning appliance label at: ", photoUri);
  const formData = new FormData();

  formData.append("image", {
    uri: photoUri,
    type: "image/jpeg",
    name: "label.jpg",
  } as any);

  const response = await fetch("http://192.168.1.123:4000/ocr", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return data.text;
}