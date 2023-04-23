const Task = require('./../models/taskModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const service = require('../services/handlerService');



exports.getAllTasks = service.getAll(Task)

exports.getTask = service.getOne(Task)

exports.createTask = service.createOne(Task)

exports.updateTask = service.updateOne(Task)

exports.deleteTask = service.deleteOne(Task)
