import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

export  type CommentDocument = Comment & Document;


@Schema()
export class Comment {
    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    timestamp: Date;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    post: Types.ObjectId;

    @Prop({ default: 0 })
    upvotes: number;

    @Prop({ default: 0 })
    downvotes: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)