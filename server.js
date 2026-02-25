const express = require("express")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

let farmState = {
    status: "offline",
    accounts: []
}

app.get("/api/state", (req, res) => {
    res.json(farmState)
})

app.post("/api/add", (req, res) => {
    const { username } = req.body

    if (!username) {
        return res.json({ error: "Missing username" })
    }

    farmState.accounts.push(username)
    farmState.status = "online"

    res.json({ message: "Added successfully", farmState })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Server running on port " + PORT))
