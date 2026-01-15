import { Router } from "express"

import { UserController } from "@/controller/user-controller"
import { validationSchema } from "@/middlewares/validation-schema"
import { registerBodySchema } from "@/schemas/register-schema"

export const userRoutes = Router()

const userController = new UserController()

userRoutes.post(
  "/",
  validationSchema({
    body: registerBodySchema,
  }),
  userController.register,
)
