import mongoose from 'mongoose';
import bcrypt   from 'bcryptjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        //required: true,
        default: bcrypt.hashSync('1a2b3c'),
        select: false
    },
    avatar: {
        type: Schema.Types.Object,
        refs: 'avatar-user.files'
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

UserSchema.pre('save', function (next) {
    let user = this;

    if ( ! user.isModified('password')) { return next() }

    user.password = bcrypt.hashSync(user.password);
    next();
});

UserSchema.methods.comparePassword = function (password) {
    let user = this;

    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
