'use strict';

const express = require('express');
const JsonParser = express.json();
const catStore = require('./catstore');
const Queue = require('../queue');

const CatRouter = express.Router();

const newCatLine = new Queue();

catStore.forEach(element => newCatLine.enqueue(element));

CatRouter
    .route('/')
    .get((req, res) => {
        const adoptableCat = newCatLine.first.data;
        return res.status(200).json(adoptableCat);
    })

    .delete((req, res) => {
        const removedCat = newCatLine.dequeue();
        newCatLine.enqueue(removedCat);
        return res.status(200).json(removedCat);
    });

module.exports = CatRouter; 