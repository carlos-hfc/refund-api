import { Request, Response } from "express"

import { prisma } from "@/lib/prisma"
import { CreateRefundBodySchema } from "@/schemas/create-refund-schema"
import { ListRefundsQuerySchema } from "@/schemas/list-refunds-schema"
import { ShowRefundParamSchema } from "@/schemas/show-refund-schema"
import { ClientError } from "@/utils/client-error"

export class RefundController {
  async list(
    request: Request<object, object, object, ListRefundsQuerySchema>,
    response: Response,
  ) {
    const { name, page, perPage } = request.query

    const pageNumber = Number(page ?? 1)
    const perPageNumber = Number(perPage ?? 10)

    const skip = (pageNumber - 1) * perPageNumber

    const where = {
      user: {
        name: {
          contains: name?.trim(),
        },
      },
    }

    const refunds = await prisma.refund.findMany({
      skip,
      take: perPageNumber,
      where,
      include: {
        user: {
          omit: {
            password: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const totalRecords = await prisma.refund.count({ where })

    const totalPages = Math.ceil(totalRecords / perPageNumber)

    return response.json({
      refunds,
      pagination: {
        page: pageNumber,
        perPage: perPageNumber,
        totalPages: totalPages > 0 ? totalPages : 1,
        totalRecords,
      },
    })
  }

  async show(request: Request<ShowRefundParamSchema>, response: Response) {
    const { id } = request.params

    const refund = await prisma.refund.findUnique({
      where: { id },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
      },
    })

    if (!refund) {
      throw new ClientError("Refund not found", 404)
    }

    return response.json(refund)
  }

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
