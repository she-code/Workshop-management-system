const mongoose = require('mongoose');
const validator = require('validator');

const workshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Workshop title is required'],
        validate: [validator.isAlphanumeric, "Title must only contain letters and numbers"],
        trim: true,
        minlength: [2, "A title must contain chracters greater than 2"],
        maxlength: [25, "A title must contain chracters smaller than 25"],
        unique:true
    },
    venue: {
        type: String,
        validate: [validator.isAlpha, "Title must only contain letters"],
        trim: true,
        minlength: [2, "A name must contain chracters greater than 2"],
        maxlength: [25, "A name must contain chracters smaller than 25"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deadline: {
        type: Date,
        required: [true, "Please insert deadline"]
    },

    // projects:[{
    //     type:mongoose.Schema.ObjectId,
    //     ref:'Project'
    // }],
    // teams: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Team'
    // }]
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

workshopSchema.virtual('projects', {
    ref: 'Project',
    foreignField: 'workshop',
    localField: '_id',
});


const Workshop = mongoose.model('Workshop', workshopSchema);


module.exports = Workshop;