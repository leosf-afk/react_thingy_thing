const express = require("express")
const match = require("./routes/match")
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/alive', (req,res) => {
    res.send('<h1>Yes</h1>')
})

app.use("/matches", match);

const PORT = 3001
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));