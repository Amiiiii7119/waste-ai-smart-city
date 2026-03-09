import express from "express"
import multer from "multer"

import { scanWaste } from "../controllers/scanController"

const router = express.Router()

const upload = multer({ dest: "uploads/" })

router.post("/scan", upload.single("image"), scanWaste)

export default router