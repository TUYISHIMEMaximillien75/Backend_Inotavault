import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/Password.util';
import { sendEmail } from 'src/utils/sendEmail';
import { MailService } from 'src/utils/sgMailer';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly mailService: MailService
    ) { }

    async createUser(name: string, email: string, password: string): Promise<User> {

        const emailExist = await this.userRepo.findOne({ where: { email } })
        if (emailExist) {
            throw new ConflictException("Email already exist")
        }

        const hashedPassowrd = await hashPassword(password)

        const user = this.userRepo.create({
            name,
            email,
            password: hashedPassowrd,
            verified: true
        })

        const inserted = await this.userRepo.save(user)

        // if(inserted){
        //     if(process.env.NODE_ENV === 'development'){
        //         await sendEmail(email,"Account Verfication Link", inserted.id);
        //     }else if(process.env.NODE_ENV === 'production'){
        //         this.mailService.sendEmail(email, "Account Verfication Link", inserted.id);
        //     }
        // }
        
        return inserted
    }

    async verifyUser(userId: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        user.verified = true;
        return this.userRepo.save(user);
    }
    
     
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { email } });
    }


}
