import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { userRoles } from '../enums/user-roles';

export type UserDocument = User & Document;

@Schema({ timestamps: true, strict: false })
export class User {
  @Prop({
    type: MongooseSchema.Types.String,
    index: true,
    required: true,
    unique: true,
  })
  id: string;

  @Prop({
    type: MongooseSchema.Types.String,
    index: true,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  password: string;

  @Prop({
    type: MongooseSchema.Types.String,
  })
  company: string;

  @Prop({
    type: MongooseSchema.Types.String,
    enum: [userRoles],
    default: userRoles.CLIENT,
  })
  role: userRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
