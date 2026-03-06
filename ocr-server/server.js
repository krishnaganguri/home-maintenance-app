const express = require("express")
const multer = require("multer")
const cors = require("cors")
const vision = require("@google-cloud/vision")

const app = express()

app.use(cors())

const upload = multer({ storage: multer.memoryStorage() })

const client = new vision.ImageAnnotatorClient({
  keyFilename: "./vision-key.json"
})

app.post("/ocr", upload.single("image"), async (req, res) => {

  try {

    const imageBuffer = req.file.buffer

    const [result] = await client.textDetection({
      image: { content: imageBuffer }
    })

    const detections = result.textAnnotations

    if (!detections.length) {
      return res.json({ text: "" })
    }

    const fullText = detections[0].description
    console.log("OCR Result:", fullText)

    res.json({ text: fullText })

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "OCR failed" })

  }

})

app.listen(4000, () => {
  console.log("OCR server running on port 4000")
})