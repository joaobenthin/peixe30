import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

const contactIdQueryParamSchema = z.object({
  contactId: z.string(),
})

type ContactQueryParamSchema = z.infer<typeof contactIdQueryParamSchema>

@Controller('/contacts')
@UseGuards(JwtAuthGuard)
export class DeleteContactController {
  constructor(private prisma: PrismaService) {}

  @Delete(':contactId')
  async handle(@Param() params: ContactQueryParamSchema) {
    const { contactId } = params

    await this.prisma.contact.delete({
      where: {
        id: contactId,
      },
    })
  }
}
