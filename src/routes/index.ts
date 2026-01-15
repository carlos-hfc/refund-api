import { Router } from "express"

import { sessionRoutes } from "./session-routes"
import { userRoutes } from "./user-routes"

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
