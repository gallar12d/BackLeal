import {Schema} from 'mongoose';

export const UserSchema = new Schema({    
    identification: Number,
    accumulated_points: Number,    
    createdAt: {
        type: Date,
        default: Date.now
    }
})