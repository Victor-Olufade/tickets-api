import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iPhone', 'MacBook Air', 'iMac', 'iPad']
    },

    description: {
        type: String,
        required: [true, 'Please enter a description of the issue'],
    },

    status: {
        type: String,
        required: true,
        enum: ['new', 'opened', 'closed'],
        default: 'new'
    }
},
{
    timestamps: true,
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket;