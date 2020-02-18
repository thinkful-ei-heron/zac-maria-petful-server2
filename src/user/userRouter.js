'use strict';

const express = require('express');
const JsonParser = express.json();
const userStore = require('./users');
const Queue = require('../queue');

const UserRouter = express.Router();

function seedUsers() {
  const userLine = new Queue();
  userStore.forEach(element => userLine.enqueue(element));
  return userLine;
}

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
    return res.status(200).json(removedUser);
  })

  .post(JsonParser, (req, res) => {
    if (req.body.name) {
      let addUser = req.body.name;
      userLine.enqueue(addUser);
      return res.status(201).json(addUser);
    }
    if (req.body.reset) {
      userLine = seedUsers(userStore);
      return res.status(201).json(userLine);
    }
  });

let userLine = seedUsers(userStore);

module.exports = UserRouter; 