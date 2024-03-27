import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { UserPayload } from 'src/auth/jwt.strategy'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

const createContactBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  birthdate: z.string(),
  address: z.string(),
  email: z.string().email(),
})

type createContactBodySchema = z.infer<typeof createContactBodySchema>

@Controller('/contacts')
@UseGuards(JwtAuthGuard)
export class CreateContactController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body() body: createContactBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const { firstName, lastName, phone, birthdate, address, email } = body

    const contactWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (contactWithSameEmail) {
      throw new ConflictException(
        'Contact with same e-mail address already exists.',
      )
    }

    await this.prisma.contact.create({
      data: {
        firstName,
        lastName,
        phone,
        birthdate,
        address,
        email,
        userId,
      },
    })
  }
}
