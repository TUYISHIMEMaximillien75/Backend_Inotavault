import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
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
  @Get('verify/:id')
  verify(@Param('id') id:string){
    console.log(id)
    return this.authService.verifyUser(id)
  }

}
