import { hash } from "argon2"
import { Request, Response } from "express"

import { prisma } from "@/lib/prisma"
import { RegisterBodySchema } from "@/schemas/register-schema"
import { ClientError } from "@/utils/client-error"

export class UserController {
  async register(
    request: Request<object, object, RegisterBodySchema>,
    response: Response,
  ) {
    const { email, name, password, role } = request.body

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new ClientError("User already exists")
    }

    const passwordHashed = await hash(password)

    const { id: userId } = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: passwordHashed,
      },
    })

    return response.status(201).json({ userId })
  }
}
