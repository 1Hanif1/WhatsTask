const accountSid = "ACd007e0ad44d6e7f879f9b568d9544ee0";
const authToken = "3e0caf2f3409bf674171beefb8ada2ba";
const client = require("twilio")(accountSid, authToken);
const moment = require("moment");
client.messages
  .create({
    body: "Hii",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+918169053544",
  })
  .then((message) => console.log(message.sid));

// client.messages
//   .create({
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+918169053544",
//   })
//   .then((message) => console.log(message.sid));
// Query the database or task manager for pending or in-progress tasks
const getTasks = () => {
  // Your implementation here
};

// Send a WhatsApp message for each task that has a deadline that has passed
const sendReminders = (tasks) => {
  const from = "whatsapp:+14155238886";

  tasks.forEach((task) => {
    const { id, user, deadline, details } = task;
    const to = `whatsapp:${user.phoneNumber}`;

    if (moment().isAfter(deadline)) {
      client.messages
        .create({
          body: `Task ${id} deadline has passed.\nDetails: ${details}`,
          from: from,
          to: to,
        })
        .then((message) => console.log(message.sid))
        .catch((error) => console.log(error));
    }
  });
};

// Schedule the function to run periodically
const cron = require("node-cron");

cron.schedule("0 0 * * *", () => {
  const tasks = getTasks();
  sendReminders(tasks);
});
