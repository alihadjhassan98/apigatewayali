import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CategorieModule } from './categorie/categorie.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CategorieModule,
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
  controllers: [AppController],
  providers: [
    AppService,
    AuthGuard,
    RoleGuard,
  
      ],
})
export class AppModule {}
