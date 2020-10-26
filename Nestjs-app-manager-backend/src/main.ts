import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger} from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
const serverConfig = config.get('server');
const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, {cors: true}); //bad practice since cors: true all the time, but enableCors() wasnt working when tested. 
  await app.listen(3000);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }else{
    app.enableCors({origin: serverConfig.origin})
    logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  }
  
  const port = process.env.PORT || serverConfig.port;
  logger.log(`App listening on port ${port}`);
}

bootstrap();
