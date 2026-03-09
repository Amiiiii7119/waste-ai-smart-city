import fs from "fs"
import path from "path"

export const getRoutes = (req, res) => {

  const file = path.join(
    __dirname,
    "../../pathway/analytics/ward_stats.json"
  )

  if (!fs.existsSync(file)) {
    return res.json({ routes: [] })
  }

  const lines = fs.readFileSync(file, "utf8").trim().split("\n")

  const wards = lines.map((l) => JSON.parse(l))

  const latest = {}

  for (const w of wards) {
    latest[w.ward] = w
  }

  const routePriority = Object.values(latest).sort(
    (a: any, b: any) => b.scans - a.scans
  )

  res.json({ routes: routePriority })
}