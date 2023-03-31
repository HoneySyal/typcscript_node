import mongoose, { Schema } from 'mongoose';
import IUser from '../interface/userInterface';
// import roles from '../util/const';

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      if (this.email === 'admin@gmail.com') {
        this.role = 'admin';
      }
    }
    next();
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model<IUser>('User', UserSchema);