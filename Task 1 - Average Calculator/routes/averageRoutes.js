import express from "express"
import averageCounter from "../controllers/averageController.js"
const router = express()

router.get("/:numberid",averageCounter.calAverage)

export default router