const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.setTaskIds = (req, res, next) => {
    if (!req.body.list) req.body.list = req.params.id;
    next();
};


exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc =  await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(204).json({
        status: 'success',
        data : null
    });   
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
     }) 

    
     if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(201).json({
        status: 'success',
        data : {
            doc
        }
    });

});

exports.createOne = Model => catchAsync(async (req, res, next) => {

    if(!req.body.list) req.body.list = req.params.id

    const newDoc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data : {
            data: newDoc
        }
    });   
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {

    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    // chaneged
    res.status(200).json({
        status: 'success',
        data: doc
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {

    let filter = {};
    if (req.params.id) filter = {list: req.params.id};
    const doc = await Model.find(filter);

    res.status(200).json({
        status: 'success',
        data: doc
    });
});
