import { UserRole } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

import { ClientError } from "@/utils/client-error"

export function verifyUserRole(...role: UserRole[]) {
  return (request: Request, _: Response, next: NextFunction) => {
    if (!request.user || !role.includes(request.user.role)) {
      throw new ClientError("Unauthorized", 401)
    }

    return next()
  }
}
