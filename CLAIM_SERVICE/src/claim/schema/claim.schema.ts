import {Schema} from 'mongoose';

export const ClaimSchema = new Schema({    
    points: Number,
    detail: String,
    identification: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})