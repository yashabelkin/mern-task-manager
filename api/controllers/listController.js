const List = require('../models/listModel');
const service = require('./../services/handlerService');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync')

exports.getAllLists = service.getAll(List)

exports.getList = service.getOne(List, {path: 'tasks'})

exports.createList = service.createOne(List)

exports.updateList = service.updateOne(List)

exports.deleteList = service.deleteOne(List)
