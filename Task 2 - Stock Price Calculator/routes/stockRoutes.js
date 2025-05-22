import express from "express"
import stockCalculator from "../controllers/stockController.js"
const router = express()

router.get("/:numberid",stockCalculator.calStock)

export default router