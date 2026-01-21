import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";


const jwtService = new JwtService({
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN as any,
    },
})

export const generateToken = (user: User) => {
    const payload = {
        sub: user.id,
        name: user.name,
        role: user.role,
    };
    return jwtService.sign(payload);
}