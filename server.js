const express = require("express");
var cron = require("node-cron");
const connectDB = require("./config/db");
const nodemailer = require("nodemailer");
const Reminder = require("./models/reminder");
const path = require("path");




const reminderRoutes = require("./routes/reminders");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { getMaxListeners } = require("./models/reminder");

app = express();
connectDB();


app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));


app.use("/api/reminders", reminderRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/auth", authRoutes); 



//EMAIL SENDING FUNC
async function sendEmails(Reminder) {
    const reminders = await Reminder.find();

    //current date since Epoch
    const currDate = Math.ceil(Date.now() / 86400000);
    //first Jan current year since Epoch
    const firstJanSinceEpoch = Math.ceil((new Date(`1 1 ${new Date().getFullYear()}`).getTime()) / 86400000)
    const currDays = currDate - firstJanSinceEpoch;

    //fix dates in Jan (not to skipp reminders from the beginning of the next year)
    const fixedReminders = reminders.map (r => ((r.eventInDays - r.interval) < 0 ? { ...r, eventInDays: r.eventInDays + currDays } : r));
    
    //get only those to remind now
    const toRemind = fixedReminders.filter(r => ((r.eventInDays - r.interval) == currDays));

    //call func to send emails
    for (let i = 0; i < toRemind.length; i++) {
        main(toRemind[i].email, toRemind[i].occasion).catch(console.error);
    }
}


//NODEMAILER CONFIG
async function main(email, occasion) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "rikratest@gmail.com",
            pass: "testrikra"
        },
        //I need this property on localhost
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Reminder App" <ssdrznedaj@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Neue Erinnerung", // Subject line
        text: occasion, // plain text body
        html: occasion, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
}


//THIS CRON TAKES CARE OF SENDING E-MAILS
cron.schedule('0 0 * * *', () => {
    sendEmails(Reminder);
}, {
    timezone: "Europe/Vienna"
});

//Serve static assets in production
if(process.env.NODE_ENV === "production"){
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("APP IS RUNNING ON PORT", PORT)
})