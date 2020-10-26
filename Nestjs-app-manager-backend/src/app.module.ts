import { Module } from '@nestjs/common';
import { ApplicationsModule } from './apps/applications.module';
import { TypeOrmModule} from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),ApplicationsModule, AuthModule],
  
})

export class AppModule {}
