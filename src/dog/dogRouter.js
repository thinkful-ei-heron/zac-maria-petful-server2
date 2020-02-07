'use strict';

const express = require('express');
const JsonParser = express.json();
const dogStore = require('./dogstore');
const Queue = require('../queue');

const DogRouter = express.Router();

const newDogLine = new Queue();

dogStore.forEach(element => newDogLine.enqueue(element));

DogRouter
    .route('/')
    .get((req, res) => {
        const adoptableDog = newDogLine.first.data;
        return res.status(200).json(adoptableDog);
    })

    .delete((req, res) => {
        const removedDog = newDogLine.dequeue();
        newDogLine.enqueue(removedDog);
        return res.status(200).json(removedDog);
    });

module.exports = DogRouter; 