// const path = require('path')
const express = require('express')
const JsonParser = express.json(); 
const userStore = require('./users')
const Queue = require('../queue')


const UserRouter = express.Router(); 
const userLine = new Queue(); 

userStore.forEach(element => userLine.enqueue(element))

UserRouter 
 .route('/')
 .get((req, res ) => {
    firstInLine = userLine.first.data
        return res.status(200).json(firstInLine)
 })

 // add delete !

 //maybe add a post !! 


 module.exports = UserRouter; 