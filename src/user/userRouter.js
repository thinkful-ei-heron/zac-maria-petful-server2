// const path = require('path')
const express = require('express')
const JsonParser = express.json(); 
const userStore = require('./users')
const Queue = require('../queue')


const UserRouter = express.Router(); 
const userLine = new Queue(); 


// Fisher-Yates Algo
function cupidShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //Timer
function intervalFunc() {
    console.log('Cant stop me now!');
  }
  
  setInterval(RemoveUser, 10000); // every 10 seconds


userStore.forEach(element => userLine.enqueue(element))

UserRouter 
 .route('/')
 .get((req, res ) => {
    firstInLine = userLine.first.data
        return res.status(200).json(firstInLine)
 })

 // add delete !
 .delete((req, res) => {
    RemoveUser = userLine.dequeue()
    userLine.enqueue(RemoveUser)
    return res.status(200).json(RemoveUser)
})

 //maybe add a post !! 
.post(JsonParser, (req, res) => {
    let addUser = req.body.name
    userStore.push(addUser)
    return res.status(201).json(addUser)
})


 module.exports = UserRouter; 