const catchAsync = require(`${__dirname}/../utils/catchAsync`)
const Leave = require(`${__dirname}/../model/Leave`)
const User = require(`${__dirname}/../model/User`);
const AppError = require(`${__dirname}/../utils/AppError`)
exports.getAllLeaves = catchAsync(async(req, res, next) => {
    let leaves = await Leave.find().lean();
    res.status(200).json({
        status:'success',
        leaves
    });

})
exports.markLeave = catchAsync(async (req, res, next)=>{
   
    const leave = await Leave.findByIdAndUpdate(req.params.id, {category:req.body.category}, {new:true});
    if(!leave){
        return next(new AppError("No leave found by that ID", 404));
    }
    res.status(200).json({
        status:'success',
        leave
    })
})

exports.getLeaveByUserId = catchAsync(async(req, res, next)=>{
    console.log(req)
    const leave = await Leave.findBy({applicant:req.body.id});
    console.log(leave)
    res.status(200).json({
        status:"leave",
        leaveId:leave.id
    });
});

exports.applyLeave = catchAsync(async(req, res, next)=>{
    const {reason, startDate, endDate} = req.body;
    try{
        const check = await Leave.find({applicant:req.user.id});
        if(check){
            return next(new AppError("An leave application is already pending", 401));
        }
        const leave = await Leave.create({reason, to:startDate, from:endDate, applicant: req.user.id});
        
        res.status(200).json({
            status:"success", 
            leave
        })

    }
    catch(err){
        return next(new AppError(err.message, 404));
    }
});

exports.getLeaveByType = catchAsync(async(req, res, next)=>{
    
    const leaves = await Leave.find({category:req.body.category});
    
    res.status(200).json({
        status:'success',
        leaves
    })
})



