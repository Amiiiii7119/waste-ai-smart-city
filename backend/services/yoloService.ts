import * as ort from "onnxruntime-node"
import sharp from "sharp"
import fs from "fs"
import path from "path"

let session: ort.InferenceSession

const MODEL_PATH = path.resolve(__dirname, "../model/waste_classifier.onnx")

const CLASSES = [
  "battery",
  "biological",
  "brown-glass",
  "cardboard",
  "clothes",
  "green-glass",
  "metal",
  "paper",
  "plastic",
  "shoes",
  "trash",
  "white-glass"
]

export async function loadModel() {

  if (!fs.existsSync(MODEL_PATH)) {
    console.error("Model not found at:", MODEL_PATH)
    process.exit(1)
  }

  console.log("Loading ONNX model from:", MODEL_PATH)

  session = await ort.InferenceSession.create(MODEL_PATH)

  console.log("Waste classification model loaded successfully")
}

export async function classifyImage(imagePath: string) {

  if (!session) {
    throw new Error("Model not loaded")
  }

  const image = await sharp(imagePath)
    .resize(224, 224)
    .removeAlpha()
    .raw()
    .toBuffer()

  const floatData = new Float32Array(3 * 224 * 224)

  let ptr = 0

  for (let c = 0; c < 3; c++) {
    for (let i = c; i < image.length; i += 3) {
      floatData[ptr++] = image[i] / 255
    }
  }

  const tensor = new ort.Tensor("float32", floatData, [1, 3, 224, 224])

  const feeds: Record<string, ort.Tensor> = {}
  feeds[session.inputNames[0]] = tensor

  const results = await session.run(feeds)

  const output = results[session.outputNames[0]].data as Float32Array

  let maxIndex = 0
  let maxValue = output[0]

  for (let i = 1; i < output.length; i++) {
    if (output[i] > maxValue) {
      maxValue = output[i]
      maxIndex = i
    }
  }

  const label = CLASSES[maxIndex]
  const confidence = maxValue

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath)
  }

  return {
    label,
    confidence
  }
}