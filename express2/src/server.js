const express = require("express")
const cors = require("cors")
const team = require("./routes/teams")
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
//app.use(cors)
app.use("/teams", team);
app.get('/alive', (req,res) => {
    res.send('<h1>Yes</h1>')
})

const PORT = 3001
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));
