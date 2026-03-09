import express from "express"
import fs from "fs"
import path from "path"

const router = express.Router()

const CATEGORY_FILE = path.resolve(
  __dirname,
  "../../pathway/analytics/category_stats.json"
)

const LEADER_FILE = path.resolve(
  __dirname,
  "../../pathway/analytics/leaderboard.json"
)

function safeRead(filePath: string) {

  try {

    if (!fs.existsSync(filePath)) {
      return []
    }

    const raw = fs.readFileSync(filePath, "utf8")

    if (!raw || raw.trim() === "") {
      return []
    }

    const lines = raw.trim().split("\n")

    const parsed = lines
      .map((l) => {
        try {
          return JSON.parse(l)
        } catch {
          return null
        }
      })
      .filter(Boolean)

    return parsed

  } catch (err) {

    console.error("Analytics read error:", err)
    return []

  }

}

router.get("/category-stats", (req, res) => {

  const data = safeRead(CATEGORY_FILE)

  const latest = data.length > 0 ? data[data.length - 1] : {}

  res.json(latest)

})

router.get("/leaderboard", (req, res) => {

  const data = safeRead(LEADER_FILE)

  const latest = data.length > 0 ? data[data.length - 1] : {}

  res.json(latest)

})

export default router