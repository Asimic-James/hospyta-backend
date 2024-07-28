import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    @ApiProperty({ description: 'The username of the user' })
    username: string;

    @Prop({ required: true })
    @ApiProperty({ description: 'The password of the user' })
    password: string;

    @Prop({ required: false })
    @ApiProperty({ description: 'The profile picture of the user' })
    profilePicture: string;

}

export const UserSchema = SchemaFactory.createForClass(User)