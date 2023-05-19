const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

mongoose.connection.on("error", err => {
  console.log("err", err)
  process.exit();
})

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

app.listen(process.env.PORT || 4000, function() {
    console.log('listening on '+ process.env.PORT)
  })

app.get('/', function(req, res) {
    res.send('Welcome to Zerozilla API');
})

app.use('/auth', require('./src/routes/auth.routes'));
app.use('/agency', require('./src/routes/agency.routes'));
app.use('/client', require('./src/routes/client.routes'));


