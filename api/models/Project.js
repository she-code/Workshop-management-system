const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Project title is required'],
      //  validate: [validator.isAlpha, "Title must only contain english characters"],
        trim: true,
        unique: true,
        minlength: [2, "A title must contain chracters greater than 2"],
        maxlength: [25, "A title must contain chracters smaller than 25"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: {
            values: ['failed', 'ongoing', 'completed', 'just-created'],
            message: 'Status must only be failed, ongoing,completed or just-created'
        },
        default: 'just-created'
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        validate: [validator.isAlphanumeric, "Description must only contain letters and numbers"],
        trim: true,
        minlength: [10, "A description must contain chracters greater than 10"],

    },
    projType: {
        type: String,
        enum: {
            values: ['self-initiated', 'dep-intiated'],
            message: 'Project type can only be either self-initiated or dep-initiated'
        },
        default: 'dep-intiated'

    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
    },
    assigned: {
        type: Boolean,
        default: false
    },
    slug: String,
    workshop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Workshop'
    },
    advisors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Advisor'
    }],

}, {
    toJSON: {
        virtuals: true
    }
});

// projectSchema.virtual('members', {
//     ref: 'Participant',
//     localField: '_id',
//     foreignField: 'assignedTo',
//     justOne: true
// });


// projectSchema.virtual('advisors', {
//     ref: 'Advisor',
//     foreignField: 'advisor',
//     localField: '_id',
//     justOne:false
// });


projectSchema.pre(/^find/, function (next) {
   
    this.populate({
      path: 'advisors',
      select: 'fname lname email -_id',
    });
    next();
  });





const Project = mongoose.model('Project', projectSchema);
module.exports = Project;