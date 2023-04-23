const express = require('express')
const router = express.Router({ mergeParams: true });

const taskController = require('./../controllers/taskController')
const service = require('./../services/handlerService')
router
    .route('/')
    .get(taskController.getAllTasks)
    .post(
        service.setTaskIds,
        taskController.createTask
           
    )

router
    .route('/:id')
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)

module.exports = router


