const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:[true, 'must provide a name'],
        trim:true,
        maxlength:[20, 'name cannot be more than 20 characters'],
    },
    completed:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    list: {
        type: mongoose.Types.ObjectId,
        ref: 'List',
        required:[true, 'Task must belong to a list']
    }
},
{
    toJSON: { virtuals:true },
    toObject: { virtuals:true }
}
)
// // virtual populate
// TaskSchema.pre(/^find/, function(next) {
//     this.populate({
//         path: 'list',
//         select: 'name'
//     })
//     next()
// })

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task
 