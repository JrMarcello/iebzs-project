import mongoose from 'mongoose';
import bcrypt   from 'bcryptjs';

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        index: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        postal: String
    },
    created_at: {
        type: Date,
        default: Date.now,
        select: false
    },
    updated_at: {
        type: Date,
        select: false
    }
});

export default mongoose.model('Member', MemberSchema);
