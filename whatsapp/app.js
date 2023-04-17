/**
[
  {
    _id: 643c42bef408551d486ff059,
    uId: '643be4396359353f705bd10d',
    user: 643be4396359353f705bd10d,
    phoneNumber: '1234567890',
    personalTaskList: [ [Object] ],
    workspace: [ [Object] ],
    __v: 11
  }
 */

const mongoose = require("mongoose");
const Data = require("./Data");
const dotenv = require("dotenv");
const cron = require("node-cron");
dotenv.config({ path: "./config.env" });
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "Your appointment is coming up on July 21 at 3PM",
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+919137237618",
//   })
//   .then((message) => console.log(message.sid))
//   .done();

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  });

const getTasks = async () => {
  // Read all user data
  const data = await Data.find({});

  // Initialize a task array
  const tasks = [];

  //    Check each workspace, each task, date and status
  data.forEach((doc) => {
    // check personal list
    doc.personalTaskList.forEach((list) => {
      const listName = list.name;

      list.tasks.forEach((task) => {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        date = date.toISOString().split("T")[0];
        if (
          task.deadline &&
          date == task.deadline.toISOString().split("T")[0] &&
          task.status == "incomplete"
        ) {
          let message = `*${doc.userName}*! Tomorrow is the last date to finish the task *${task.name}*`;
          if (task.subtasks) {
            message += `\nYou have the follwoing Subtasks:\n`;
            task.subtasks.forEach((sb) => (message += `${sb.name}, `));
          }
          tasks.push({
            phoneNumber: doc.phoneNumber,
            message,
          });
        }
      });
    });

    // check workspace
    doc.workspace.forEach((wk) => {
      // console.log(wk);
      wk.tasks.forEach((task) => {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        date = date.toISOString().split("T")[0];
        // console.log(date);
        // console.log(task.deadline.toISOString().split("T")[0]);
        if (
          task.deadline &&
          date == task.deadline.toISOString().split("T")[0] &&
          task.status == "incomplete"
        ) {
          let message;
          // if no member assigned
          if (task.member.email) {
            console.log(task);
            message = `*${task.member.member}*! Tomorrow is the last date to finish the task *${task.name}* assigned by *${doc.userName}*.`;
            if (task.subtasks) {
              message += `\nYou have the follwoing Subtasks:\n`;
              task.subtasks.forEach((sb) => (message += `${sb.name}, `));
            }

            const member = wk.members.find(
              (member) => member.email == task.member.email
            );

            tasks.push({
              phoneNumber: member.phoneNumber,
              message,
            });
          } else {
            message = `*${doc.userName}*! Tomorrow is the last date to finish the task *${task.name}*.`;
            if (task.subtasks) {
              message += `\nYou have the follwoing Subtasks:\n`;
              task.subtasks.forEach((sb) => (message += `${sb.name}, `));
            }

            tasks.push({
              phoneNumber: doc.phoneNumber,
              message,
            });
          }
        }
      });
    });
  });
  //   { id, user, deadline, details }
  return tasks;
};

// Send a WhatsApp message for each task that has a deadline that has passed
const sendReminders = async (tasks) => {
  const from = "whatsapp:+14155238886"; // Twilio WhatsApp number

  // Loop through each task in the tasks array
  console.log(tasks);
  for (const task of tasks) {
    const { phoneNumber, message } = task;
    const to = `whatsapp:+91${phoneNumber}`; // phone number of the user

    try {
      // Use the Twilio client to send the WhatsApp message
      const messageSent = await client.messages.create({
        body: message,
        from: from,
        to: to,
      });
      console.log(`Message SID: ${messageSent.sid}`);
    } catch (error) {
      console.error(
        `Error sending message to ${phoneNumber}: ${error.message}`
      );
    }
  }
};

let remindersSent = false;

cron.schedule("* * * * *", async () => {
  if (!remindersSent) {
    const tasks = await getTasks();
    await sendReminders(tasks);
    remindersSent = true;
  }
});

// Reset remindersSent flag to false after cron job has completed
cron.schedule("59 23 * * *", () => {
  remindersSent = false;
});
