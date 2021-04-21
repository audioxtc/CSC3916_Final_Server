import mongoose from 'mongoose'
import crypto from 'crypto'

const RoundUpSchema = new mongoose.Schema({
    charity: {type: mongoose.Schema.ObjectId, ref: 'Charity'},
    amount: Number, //0.00 decimal
    customer_name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    customer_email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    payment_id: {},
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

const RoundUp = mongoose.model('RoundUp', RoundUpSchema)

export {RoundUp}
