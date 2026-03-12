export function parseOCR(text: string) {

  const lines = text.split("\n")

  let brand = ""
  let model = ""

  lines.forEach(line => {

    const lower = line.toLowerCase()

    if (lower.includes("samsung")) brand = "Samsung"
    if (lower.includes("lg")) brand = "LG"
    if (lower.includes("whirlpool")) brand = "Whirlpool"

    if (lower.includes("model")) {
      model = line.replace(/model/i, "").trim()
    }

  })

  return { brand, model }

}