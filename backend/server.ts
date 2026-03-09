import express from "express"
import cors from "cors"
import scanRoutes from "./routes/scanRoutes"
import { loadModel } from "./services/yoloService"
loadModel()
import analyticsRoutes from "./routes/analyticsRoutes"
import leaderboardRoutes from "./routes/leaderboardRoutes"
import marketplaceRoutes from "./routes/marketplaceRoutes"
import { getRoutes } from "./controllers/routeControllers"




const app = express()
app.get("/api/routes", getRoutes)
app.use(cors())
app.use("/api/marketplace", marketplaceRoutes)
app.use("/api/leaderboard", leaderboardRoutes)
app.use(express.json())
app.use("/api/analytics", analyticsRoutes)
app.use("/api", scanRoutes)

app.get("/", (req,res)=>{
 res.send("WasteAI backend running")
})

app.listen(5000,()=>{
 console.log("Backend running on port 5000")
})
app.get("/api/category-stats", (req, res) => {

  const fs = require("fs")

  const data = fs.readFileSync("../pathway/analytics/category_stats.json", "utf8")
  const lines = data.trim().split("\n")

  const json = lines.map((l: string) => JSON.parse(l))

  res.json(json)

})