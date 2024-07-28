import { Injectable } from '@nestjs/common';
import { JwtService }  from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser1(username: string, password: string): Promise<any> {
        const user = await this.usersService.validateUser(username, password);
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    login(user: any) {
        const payload = { username: user.username, sub: user._id.toString() };
        console.log({payload})
        return {
            access_token: this.jwtService.sign(payload, {secret: process.env.JWT_SECRET})
        };
    }  
    
    async validateUser({username, password}: any) {
        console.log('validate user auth service')
        const findUser = await this.usersService.findOne(username) as any;
        console.log({findUser})
        console.log('compare ',{dbPassword: findUser.password}, 'and', {reqPassword:password})
        // compare hash
        const isMatch = await bcrypt.compare(password, findUser.password)
        console.log({isMatch})
        if (findUser && isMatch) {
            console.log('password match')
            console.log({findUser})
            const { password, ...user } = findUser;
            console.log({user})
            const payload = { username: findUser.username, sub: findUser._id.toString() };
            console.log({payload})
            return this.jwtService.sign(payload, {secret: process.env.JWT_SECRET});
        }
    }

    
}
