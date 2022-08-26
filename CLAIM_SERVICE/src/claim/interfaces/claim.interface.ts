import {Document} from 'mongoose';

export interface Claim extends Document {
    readonly pints: number;
    readonly detail: string;
    readonly identification: number;
    readonly createdAt: Date;
}