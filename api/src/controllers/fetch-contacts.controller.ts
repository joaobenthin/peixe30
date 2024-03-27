import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/contacts')
@UseGuards(JwtAuthGuard)
export class FetchContactsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    const contacts = await this.prisma.contact.findMany({
      orderBy: {
        firstName: 'asc',
      },
      where: {
        userId,
      },
    })

    return { contacts }
  }
}
