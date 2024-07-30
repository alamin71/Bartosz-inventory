import mongoose from 'mongoose';

const emailQueueSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }
}, { 
  timestamps: true 
});

// Check if the model already exists before defining it
const EmailQueue = mongoose.models.EmailQueue || mongoose.model('EmailQueue', emailQueueSchema);

export default EmailQueue;
