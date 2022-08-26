import { Document } from 'mongoose';

export interface User extends Document {
  readonly identification: number;
  readonly accumulated_points: number;
  readonly createdAt: Date;
}
