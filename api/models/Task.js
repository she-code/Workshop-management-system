const mongoose = require('mongoose');
const moment = require ('moment');

const tasksSchema =new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    body:{
        type:String,
        required:[true, `Can't be empty`],
        trim:true
    },
    visibility:{
        type:String,
        default:'public',
        enum:['public','private']
        
    },
    status:{
        type:String,
        default:'ongoing',
        enum:['completed','ongoing','faield']
    },
    createdAt:{
        type:Date,
    default:Date.now    },
    progress:{
        type:Number,
        default:0    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Participant'
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Participant',
        default:this.createdBy
    },
    dueDate:{
        type:Date,
        required:[true,'Due date is required']
    },
    estimate:{
        type:Number,
        default:this.progress
    },
    worked:{
        type:Number
    }
},{
    toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      }   
})

tasksSchema.virtual('difference').get(function() {
    let due = moment(this.dueDate)
    let create = moment(this.createdAt)
    //console.log(moment(this.dueDate).format('LL'))
    //console.log(due.from(create))
    return due.from(create);
   })

const Task=mongoose.model('Task',tasksSchema);
module.exports=Task;