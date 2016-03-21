'use strict';

const { join: joinPaths } = require('path');

const findById                 = require(joinPaths(__dirname, 'findById'));
const findOne                  = require(joinPaths(__dirname, 'findOne'));
const findAll                  = require(joinPaths(__dirname, 'findAll'));
const createOne                = require(joinPaths(__dirname, 'createOne'));
const removeOne                = require(joinPaths(__dirname, 'removeOne'));
const findOrCreateOne          = require(joinPaths(__dirname, 'findOrCreateOne'));
const updateOne                = require(joinPaths(__dirname, 'updateOne'));
const findAndUpdateOrCreateOne = require(joinPaths(__dirname, 'findAndUpdateOrCreateOne'));

module.exports = {
  findById,
  findOne,
  findAll,
  createOne,
  removeOne,
  findOrCreateOne,
  updateOne,
  findAndUpdateOrCreateOne
};