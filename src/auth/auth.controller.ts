import {  Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { IResponseUser } from './interfaces/responseuser.interface';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy){}
    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
      //const user = await this.userService.login(loginDTO);
       let resLogin:IResponseUser =await firstValueFrom(this.authServiceClient.send<IResponseUser>('login', loginDTO ));
       if (resLogin.res==null){
        throw new HttpException(
          {
            message: resLogin.message,
            data: null,
            errors: resLogin.errors,
          },
          resLogin.status,
        );
       }
       return resLogin
    }
    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
      //const user = await this.userService.login(loginDTO);
       let resRegister:IResponseUser =await firstValueFrom(this.authServiceClient.send<IResponseUser>('register', registerDTO ));
       console.log(resRegister)
       if (resRegister.res==null){
        throw new HttpException(
          {
            message: resRegister.message,
            data: null,
            errors: resRegister.errors,
          },
          resRegister.status,
        );
       }
       return resRegister
    }
}
