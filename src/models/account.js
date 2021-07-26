import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 20,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Account', accountSchema);
