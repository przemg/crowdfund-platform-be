import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    trim: true,
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 20,
    required: true,
  },
});

export default mongoose.model('Account', accountSchema);
