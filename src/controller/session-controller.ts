import { verify } from "argon2"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { env } from "@/env"
import { prisma } from "@/lib/prisma"
import { AuthenticateBodySchema } from "@/schemas/authenticate-schema"
import { ClientError } from "@/utils/client-error"

export class SessionController {
  async authenticate(
    request: Request<object, object, AuthenticateBodySchema>,
    response: Response,
  ) {
    const { email, password } = request.body

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new ClientError("Invalid credentials")
    }

    const doesPasswordMatch = await verify(user.password, password)

    if (!doesPasswordMatch) {
      throw new ClientError("Invalid credentials")
    }

    const token = jwt.sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    })

    return response.json({ token, user })
  }
}
