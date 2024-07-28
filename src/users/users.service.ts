import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcryptjs';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ username }).exec();
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
      }
    constructor(@InjectModel("Users") private userModel: Model<UserDocument>) {}

    async findOne(username: string): Promise<User | undefined> { 
        return this.userModel.findOne({ username }).exec();
    }
    async findById(id: string): Promise<User | undefined> {
        return this.userModel.findById(id).exec();
    }

    async create(user: User): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async update(id: string, user: User): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

}
