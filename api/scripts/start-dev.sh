#!/bin/bash

export NODE_ENV=development
nodemon app.js --exec babel-node
