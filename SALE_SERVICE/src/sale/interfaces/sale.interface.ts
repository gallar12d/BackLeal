import {Document} from 'mongoose';

export interface Sale extends Document {
    readonly value: number;
    readonly detail: string;
    readonly identification: number;
    readonly createdAt: Date;
}