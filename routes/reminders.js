const express = require ("express");
const router=express.Router();
const Reminder = require ("../models/reminder");
const User = require("../models/user");
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator");


//SHOW ALL REMINDERS
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const reminders = await Reminder.find({user:user._id})
        res.json(reminders);
    } catch (e) {
        console.log(e)
        res.status(500).send("Server Error");
    }
})


//ADD REMINDER
router.post("/", [auth, [
    check("day", "Day is required.")
        .not()
        .isEmpty(),

    check("month", "Month is required.")
        .not()
        .isEmpty(),

    check("occasion", "Ocassion is required.")
        .not()
        .isEmpty(),

    check("interval", "Interval is required.")
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { day, month } = req.body;

    //event since Epoch - 1.Jan current year since Epoch = day in sequence of days in current year
    const eventSinceEpoch = Math.ceil((new Date(`${month} ${day} ${new Date().getFullYear()}`).getTime()) / 86400000);
    const firstJanSinceEpoch = Math.ceil((new Date(`1 1 ${new Date().getFullYear()}`).getTime()) / 86400000)
    const eventInDays = eventSinceEpoch - firstJanSinceEpoch + 1;

    try {
        const user = await User.findById(req.user.id).select("-password");
        const email = user.email;
        const newReminder = await Reminder.create({ ...req.body, email, eventInDays, user })
        res.status(201).json(newReminder) //201=CREATED
    } catch (e) {
        res.send(e)
    }

})

//GET REMINDER
router.get("/:reminderId", async (req, res) => {
    try {
        const foundRem = Reminder.findById(req.params.reminderId)
        res.json(foundRem);
    } catch (e) {
        console.log(e)
        res.status(500).send("Server Error");
    }
})

//EDIT REMINDER
router.put("/:reminderId", [auth, [
    check("day", "Day is required.")
        .not()
        .isEmpty(),

    check("month", "Month is required.")
        .not()
        .isEmpty(),

    check("occasion", "Ocassion is required.")
        .not()
        .isEmpty(),

    check("interval", "Interval is required.")
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { day, month } = req.body;
    //event since Epoch - 1.Jan current year since Epoch = day in sequence of days in current year
    const eventSinceEpoch = Math.ceil((new Date(`${month} ${day} ${new Date().getFullYear()}`).getTime()) / 86400000);
    const firstJanSinceEpoch = Math.ceil((new Date(`1 1 ${new Date().getFullYear()}`).getTime()) / 86400000)
    const eventInDays = eventSinceEpoch - firstJanSinceEpoch + 1;

    try {
        const reminder = await Reminder.findById(req.params.reminderId);
        //check user
        if (reminder.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized." })
        }
        const updatedRem = await Reminder.findByIdAndUpdate(req.params.reminderId, { ...req.body, eventInDays }, { new: true }) //respond with new data
        res.json(updatedRem);
    } catch (e) {
        console.log(e)
        res.status(500).send("Server Error");
    }
})

//DELETE REMINDER
router.delete("/:reminderId", auth, async(req, res)=>{
    try {
        const reminder = await Reminder.findById(req.params.reminderId);
        //check user
        if(reminder.user.toString() !== req.user.id){
            return res.status(401).json({msg:"User not authorized."})
        }
        await reminder.remove();
        res.json({message:"Deleted Reminder!"})
    }catch (e){
        console.log(e)
        res.status(500).send("Server Error");
    }
})



module.exports=router;