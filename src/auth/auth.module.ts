import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({  
    imports: [
      ClientsModule.register([
        { 
          name: 'AUTH_SERVICE', 
        transport: Transport.TCP,
        options:{ 
          host: "0.0.0.0",
          port: parseInt(process.env.AUTHMCPORT),
        } 
      },
    
      ]),
  ],
  providers: [
    ConfigService,
    

  ],
  controllers: [AuthController],
  
})
export class AuthModule {
    
}
