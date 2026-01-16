import { Router } from "express"

import { RefundController } from "@/controller/refund-controller"
import { validationSchema } from "@/middlewares/validation-schema"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import { createRefundBodySchema } from "@/schemas/create-refund-schema"
import { listRefundsQuerySchema } from "@/schemas/list-refunds-schema"
import { showRefundParamSchema } from "@/schemas/show-refund-schema"

export const refundRoutes = Router()

const refundController = new RefundController()

refundRoutes.post(
  "/",
  verifyUserRole("employee"),
  validationSchema({
    body: createRefundBodySchema,
  }),
  refundController.create,
)
refundRoutes.get(
  "/",
  verifyUserRole("manager"),
  validationSchema({
    query: listRefundsQuerySchema,
  }),
  refundController.list,
)
refundRoutes.get(
  "/:id",
  verifyUserRole("manager", "employee"),
  validationSchema({
    params: showRefundParamSchema,
  }),
  refundController.show,
)
