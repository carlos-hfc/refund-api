import { Router } from "express"

import { auth } from "@/middlewares/auth"

import { refundRoutes } from "./refund-routes"
import { sessionRoutes } from "./session-routes"
import { uploadRoutes } from "./upload-routes"
import { userRoutes } from "./user-routes"

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)

routes.use(auth)
routes.use("/refunds", refundRoutes)
routes.use("/uploads", uploadRoutes)
