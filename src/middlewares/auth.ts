import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

import { env } from "@/env"
import { prisma } from "@/lib/prisma"
import { ClientError } from "@/utils/client-error"

export async function auth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const auth = request.headers.authorization

    if (!auth) {
      throw new ClientError("Unathorized", 401)
    }

    const [, token] = auth.split(" ")

    if (!token) {
      throw new ClientError("No token provided", 401)
    }

    const { sub: id } = verify(token, env.JWT_SECRET) as { sub: string }

    const user = await prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    })

    if (!user) {
      throw new ClientError("Unauthorized", 401)
    }

    request.user = user

    return next()
  } catch (error) {
    next(error)
  }
}
