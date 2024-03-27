import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from './env'

import { PrismaService } from './prisma/prisma.service'

import { AuthModule } from './auth/auth.module'

import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controler'
import { CreateContactController } from './controllers/create-contact.controller'
import { FetchContactsController } from './controllers/fetch-contacts.controller'
import { DeleteContactController } from './controllers/delete-contact.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateContactController,
    FetchContactsController,
    DeleteContactController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
