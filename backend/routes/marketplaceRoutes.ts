import express from "express"
import fs from "fs"
import path from "path"

const router = express.Router()

const FILE = path.resolve(__dirname, "../../data/marketplace.json")

router.get("/", (req, res) => {

  const data = JSON.parse(fs.readFileSync(FILE, "utf8"))

  res.json(data.items)

})

export default router