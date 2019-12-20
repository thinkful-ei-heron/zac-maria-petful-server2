const express = require('express')
const JsonParser = express.json(); 
const dogStore = require('./dogstore')
const Queue = require('../queue')


const DogRouter = express.Router(); 


const newDogLine = new Queue(); 

dogStore.forEach(element => newDogLine.enqueue(element)); 


DogRouter 
 .route('/')
 .get((req, res) => {
    adoptableDog = newDogLine.first.data
        res.status(200).json(adoptableDog)
 })

 .delete((req, res) => {
    RemoveDog = newDogLine.dequeue()
    newCatLine.enqueue(RemoveDog)
    return res.status(200).json(RemoveDog)
})


 // add delete !

 //maybe add a post !! 


 module.exports = DogRouter; 