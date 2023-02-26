import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

type CustomValidationError = {
  value?: unknown;
  constraints?: {
    [type: string]: string;
  };
  children?: CustomValidationError[];
};

function validationErrorTransform(err: ValidationError): CustomValidationError {
  const { children } = err;

  return {
    value: err.value,
    constraints: err.constraints,
    children: children?.length ? children.map(validationErrorTransform) : undefined,
  };
}

function validationErrorArrayToObject(errors: ValidationError[]) {
  return errors.reduce((acc, error) => {
    const { property } = error;
    return {
      ...acc,
      [property]: validationErrorTransform(error),
    };
  }, {});
}

function setupSwagger(appInstance: INestApplication, selfUrl: string) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SmartTimetable API')
    .setDescription(
      `This is a SmartTimetable API on the OpenAPI 3.0 specification. You can find JSON schema at [${selfUrl}/api-json](${selfUrl}/api-json). Note that this URL may change in future.`,
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(appInstance, swaggerConfig);

  SwaggerModule.setup('api', appInstance, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);
  const env = configService.get<string>('nodeEnv');
  const port = configService.get<number>('port') as number;

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  if (env === 'development' || env === 'staging') {
    const selfUrl = configService.getOrThrow<string>('url.self');
    setupSwagger(app, selfUrl);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      exceptionFactory: (errors) => new BadRequestException(validationErrorArrayToObject(errors)),
    }),
  );

  app.listen(port, '0.0.0.0', () => {
    Logger.log(`Running on port ${port}`, 'NestApplication');
    Logger.log(`Environment ${env}`, 'NestApplication');
  });
}

bootstrap();
