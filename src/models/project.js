import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    account: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
    title: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 50,
      unique: true,
    },
    shortDescription: {
      type: String,
      required: true,
      minLength: 50,
      maxLength: 200,
    },
    about: {
      type: String,
      required: true,
      minLength: 100,
      maxLength: 500,
    },
    backingAmountGoal: {
      type: Number,
      required: true,
      min: 500,
      max: 10000000,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    rewards: [
      {
        name: {
          type: String,
          required: true,
          minLength: 5,
          maxLength: 50,
        },
        description: {
          type: String,
          required: true,
          minLength: 150,
          maxLength: 500,
        },
        minPledge: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    brandColor: {
      type: String,
      required: true,
    },
    brandLogo: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
