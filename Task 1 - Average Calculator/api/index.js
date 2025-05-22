import express from "express"
import router from "../routes/averageRoutes.js"

const app = express()
app.use(express.json())

app.use("/numbers",router)

app.get("/", (req, res) => {
    res.json("Hello")
})

app.listen(9876, () => {
    console.log("Server is running on port 9876")
})
