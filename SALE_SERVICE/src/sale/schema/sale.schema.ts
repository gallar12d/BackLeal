import {Schema} from 'mongoose';

export const SaleSchema = new Schema({    
    value: Number,
    detail: String,
    identification: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})