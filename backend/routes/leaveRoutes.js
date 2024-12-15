const express = require("express");
const router = express.Router();
const leaveController = require(`${__dirname}/../controller/leaveCtrl`);
const userController = require(`${__dirname}/../controller/userCtrl`);

router.route("/filter").post(leaveController.getLeaveByType);
router.route("/stats").get(leaveController.leaveStats);
router.route("/").get(leaveController.getAllLeaves);
router.route("/").post(userController.protect, leaveController.applyLeave);

router.route("/:id").post(leaveController.markLeave);

router.route("/user/:id").get(leaveController.getLeaveByUserId);

module.exports = router;
