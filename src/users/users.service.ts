import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword, comparePassword } from 'src/utils/Password.util';
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

    async findOne(id: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { id } });
    }

    async update(id: string, updateData: any): Promise<User> {
        const user = await this.findOne(id);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (updateData.password) {
            if (!updateData.currentPassword) {
                throw new BadRequestException('Current password is required to change password');
            }
            const isMatch = await comparePassword(updateData.currentPassword, user.password);
            if (!isMatch) {
                throw new UnauthorizedException('Incorrect current password');
            }
            updateData.password = await hashPassword(updateData.password);
        }

        // Remove currentPassword from updateData before saving to DB
        delete updateData.currentPassword;

        Object.assign(user, updateData);
        return this.userRepo.save(user);
    }
}
