const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/sen', (req,res) => {
  console.log(req.file);
  console.log(req.body.text);
  console.log(req.body.customfield);
})

app.listen(3001, () => {
  console.log("Server is running")
})