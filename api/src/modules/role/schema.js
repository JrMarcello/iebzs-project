/* eslint import/no-mutable-exports:0 */
import mongoose from 'mongoose';
import actions from '../action/actions';

const Schema = mongoose.Schema;

let RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  description: {
    type: String,
  },
  actions: {
    type: Array,
    default: [{
      MEMBER_READ: actions.member.MEMBER_READ,
    }],
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

RoleSchema = mongoose.model('Role', RoleSchema);

export default RoleSchema;
