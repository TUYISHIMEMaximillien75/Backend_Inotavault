import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { comparePassword } from 'src/utils/Password.util';
import { generateToken } from 'src/utils/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly userServices: UsersService
    ){}

    async Register(dto: RegisterDto){
        const user = await this.userServices.createUser(
            dto.name,
            dto.email,
            dto.password
        )

        return {
            message: "User register successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }

    async verifyUser(id:string){
        return this.userServices.verifyUser(id)
    }

    async Login(dto: LoginDto){
        const user = await this.userServices.findByEmail(dto.email)
        if(!user){
            throw new UnauthorizedException("Invalid credentials")
        }
        const isPasswordMatched = await comparePassword(dto.password, user.password)
        if(!isPasswordMatched){
            throw new UnauthorizedException("Invalid credentials")
        }
        if(!user.verified){
            throw new UnauthorizedException("User is not verified")
        }
        const token = await generateToken(user);
        return {
            message: "User login successfully",
            user: {
                id: user.id,
                name: user.name,
                token: token
            }
        }
                
    }

}
