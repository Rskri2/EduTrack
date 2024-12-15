const mongoose = require('mongoose');
const User = require(`${__dirname}/User`);
const LeaveSchema = new mongoose.Schema({
    reason:{
        type:String
    },
    to:{
        type:Date
    }, 
    from:{
        type:Date,
    },
    applicant:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    category:{
        type:String,
        default:"pending",
        enum:{
            values:["pending", "approved", "rejected"]
        }
    }
})

LeaveSchema.pre('find', function (next) {
    this.populate({
        path:'applicant',
        select:'name department'
    })
    next();
})

 const Leave = mongoose.model('Leave', LeaveSchema);
 module.exports = Leave;