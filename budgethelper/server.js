const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Account = require('./AccountModel.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/api/accounts', function(req, res) {
  const newAccount = new Account(req.body);

  newAccount.save(function(err, account) {
    if(err){
      res.status(STATUS_SERVER_ERROR).json({ error: 'error with save' })
    } else {
      res.status(200).json(account);
    }
  });
})

server.get('/api/accounts', function(req, res) {
  Account.find({}, function(err, account){
    if(err){
      // error check
    } else {
      res.status(200).json(account);
    }
  });
})

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/accounts',
  { useMongoClient: true }
);

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
})

