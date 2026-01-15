import { Request, Response } from "express"

import { prisma } from "@/lib/prisma"
import { CreateRefundBodySchema } from "@/schemas/create-refund-schema"

export class RefundController {
  async create(
    request: Request<object, object, CreateRefundBodySchema>,
    response: Response,
  ) {
    const { amount, category, filename, name } = request.body

    const { id: refundId } = await prisma.refund.create({
      data: {
        amount,
        category,
        filename,
        name,
        userId: request.user.id,
      },
    })

    return response.status(201).json({ refundId })
  }
}
