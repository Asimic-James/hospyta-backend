import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";


export  type PostDocument = Post & Document;

export enum HealthCategory  {
    Kidney = "kidney",
    Liver = "liver",
    Heart = "heart",
    Lungs = "lungs",
    Diabetes = "diabetes",
    Other = "other",
}


@Schema()
export class Post {

    @Prop({ required: true })
    @ApiProperty({ description: 'The content of the post' })
    content: string;

    @Prop({ required: true, enum: HealthCategory })
    @ApiProperty({ description: 'The category of the post', enum: ['kidney', 'liver', 'heart', 'lungs', 'diabetes', 'other'] })
    category: HealthCategory;

    @Prop({ default: Date.now })
    @ApiProperty({ description: 'Timestamp of when the post was created' })
    timestamp: Date;

    @Prop({ type: Types.ObjectId, ref: 'User', required: false })
    @ApiProperty({ description: 'The user who created the post' })
    user: Types.ObjectId;

    @Prop({ default: 0 })
    @ApiProperty({ description: 'Number of upvotes' })
    upvotes: number;

    @Prop({ default: 0 })
    @ApiProperty({ description: 'Number of downvotes' })
    downvotes: number;

    @Prop()
    @ApiProperty({ description: 'The URL of the image associated with the post', required: false })
    image: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);
