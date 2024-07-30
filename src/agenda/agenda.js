import Agenda from 'agenda';
import mongoose from 'mongoose';
import sendSingleEmail from '../utils/mail.js';
import EmailQueue from '../model/EmailQueue.js';

const mongoConnectionString = "mongodb://localhost:27017/horeca-ai"; // Get the MongoDB connection string from the environment variables

// Create a new instance of Agenda
const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: 'agendaJobs',
  },
});

// Define the job to send emails
agenda.define('send emails', async (job, done) => {
  const unsentEmailData = await EmailQueue.find().limit(5);
  console.log(unsentEmailData);
  if (unsentEmailData.length === 0) {
    console.log('No emails to send');
    return done();
  }

  for (const emailData of unsentEmailData) {
    try {
      const result = await sendSingleEmail(emailData);
      if(result){
        console.log(`Email sent to ${emailData.email}`);
        await EmailQueue.findByIdAndDelete(emailData._id);
      }
      // Adding a delay to prevent getting banned by Google
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between emails
    } catch (error) {
      console.error(`Error sending email to ${emailData.email}:`, error);
    }
  }
  done();
});

(async function () {
  try {
    await mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await agenda.start();
    console.log('Agenda started');

    // Schedule the job to run every minute
    await agenda.every('1 minute', 'send emails');
  } catch (error) {
    console.error('Error starting Agenda:', error);
    process.exit(1);
  }
})();

async function graceful() {
  await agenda.stop();
  console.log('Agenda stopped. Exiting process..');
  process.exit(0);
}

// Gracefully stop the process on SIGINT and SIGTERM signals
process.on('SIGINT', graceful);
process.on('SIGTERM', graceful);
