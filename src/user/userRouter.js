'use strict';

const express = require('express');
const JsonParser = express.json();
const userStore = require('./users');
const Queue = require('../queue');

const UserRouter = express.Router();
const userLine = new Queue();

userStore.forEach(element => userLine.enqueue(element));

function currentLine(userLine) {
  let currNode = userLine.first;
  const output = [];

  while (currNode) {
    output.push(currNode.data);
    currNode = currNode.next;
  }

  return output;
}

UserRouter
  .route('/')
  .get((req, res) => {
    const line = currentLine(userLine);
    return res.status(200).json(line);
  })

  .delete((req, res) => {
    const removedUser = userLine.dequeue();
    userLine.enqueue(removedUser);
    return res.status(200).json(removedUser);
  })

  .post(JsonParser, (req, res) => {
    let addUser = req.body.name;
    userLine.enqueue(addUser);
    return res.status(201).json(addUser);
  });

module.exports = UserRouter; 