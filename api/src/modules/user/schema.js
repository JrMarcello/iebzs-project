/* eslint func-names:0 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, trim: true },
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    default: bcrypt.hashSync('1a2b3c')
  },
  avatar: {
    type: String,
  },
  role_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    select: false,
  },
  updated_at: {
    type: Date,
    select: false,
  },
});

UserSchema.virtual('role', {
  ref: 'Role',
  localField: 'role_id',
  foreignField: '_id',
  justOne: true,
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  user.password = bcrypt.hashSync(user.password);
  next();
});

UserSchema.methods.comparePassword = (password) => {
  const user = this;

  return bcrypt.compareSync(password, user.password);
};

export default mongoose.model('User', UserSchema);
