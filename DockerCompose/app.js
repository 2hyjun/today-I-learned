const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 24895

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({ message: "hello" })
})


app.listen(PORT, () => {
  console.log('Server is Running at port', PORT)
})
