// const path = require('path')
const express = require('express')
const JsonParser = express.json(); 
const catStore = require('./catstore')
const Queue = require('../queue')


const CatRouter = express.Router(); 


const newCatLine = new Queue(); 

catStore.forEach(element => newCatLine.enqueue(element)); 

CatRouter 
 .route('/')
 .get((req, res ) => {
    adoptableCat = newCatLine.first.data
        return res.status(200).json(adoptableCat)
 })

 // add delete !
 .delete((req, res) => {
     RemoveCat = newCatLine.dequeue()
     newCatLine.enqueue(RemoveCat)
     return res.status(200).json(RemoveCat)
 })

 //maybe add a post !! 


 module.exports = CatRouter; 