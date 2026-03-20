import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiSecurity } from '@nestjs/swagger';

// import { VerifyDto } from './dto/verify.dto';
import { Public } from './decorators/public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post("register")
  register(@Body() dto:RegisterDto){
    return this.authService.Register(dto)
  }
  @Public()
  @Post("login")
  login(@Body() dto:LoginDto){
    return this.authService.Login(dto)
  }
  @Public()
  @Post('verify/:id')
  verify(@Param('id') id:string){
    console.log(id)
    return this.authService.verifyUser(id)
  }

  @ApiSecurity('JWT-auth')  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@CurrentUser() user: User){
    return this.authService.profile(user)
  }

}
