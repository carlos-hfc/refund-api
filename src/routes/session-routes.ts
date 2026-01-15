import { Router } from "express"

import { SessionController } from "@/controller/session-controller"
import { validationSchema } from "@/middlewares/validation-schema"
import { authenticateBodySchema } from "@/schemas/authenticate-schema"

export const sessionRoutes = Router()

const sessionController = new SessionController()

sessionRoutes.post(
  "/",
  validationSchema({
    body: authenticateBodySchema,
  }),
  sessionController.authenticate,
)
