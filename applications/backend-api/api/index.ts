import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

const server = express();
let cachedApp = null;

export const createNestServer = async (expressInstance) => {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressInstance),
      { bodyParser: false }
    );
    
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    
    app.enableCors({
      origin: true, // Allow all origins for Vercel deployment by default
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.use(cookieParser());

    await app.init();
    cachedApp = app;
  }
  return cachedApp;
};

export default async (req, res) => {
  await createNestServer(server);
  server(req, res);
};
