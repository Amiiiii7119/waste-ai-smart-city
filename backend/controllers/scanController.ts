import fs from "fs"
import path from "path"

export const scanWaste = async (req, res) => {

  try {

    const category = req.body.category
    const confidence = req.body.confidence || 0.99
    const points = 10

    const timestamp = new Date().toISOString().slice(0, 19)

    const event = {
      timestamp,
      user: "citizen",
      category,
      points,
      confidence,
      ward: "Ward-1"
    }

    const filePath = path.join(__dirname, "../../data/waste_events.json")

    fs.appendFileSync(filePath, JSON.stringify(event) + "\n")

    res.json({
      success: true,
      event
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Failed to log waste event"
    })

  }

}