const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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


// app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

app.use('/auth', require('./routes/auth.routes'));
app.use('/agency', require('./routes/agency.routes'));
app.use('/client', require('./routes/client.routes'));


