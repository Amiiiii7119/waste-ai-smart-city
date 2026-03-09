import express from "express"
import fs from "fs"
import path from "path"

const router = express.Router()

const FILE = path.resolve(__dirname, "../../data/leaderboard.json")

router.get("/", (req, res) => {

  const data = JSON.parse(fs.readFileSync(FILE, "utf8"))

  const sorted = Object.entries(data.users)
    .map(([name, points]) => ({ name, points }))
    .sort((a: any, b: any) => b.points - a.points)

  res.json(sorted)
})

export default router