const express = require("express")
const bodyParser = require('body-parser')
const producto = require("./routes/producto")


var cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/alive', (req,res) => {
    res.send('<h1>Yes</h1>')
})

app.use("/productos", producto);

const PORT = 3001
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));