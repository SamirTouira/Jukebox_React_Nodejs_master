const mongoose = require("mongoose");
const mysql = require('mysql');
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err) throw err;
    console.log('Connected to database !');
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});


require("./models/User");
const app = require('./app');
app.set('port', 4242);


mongoose.connect(process.env.DATABASE)
const server = app.listen(app.get('port'), () => {
    console.log(`🚀 📱 💻 Launched server on localhost:${app.get('port')}`);
});
