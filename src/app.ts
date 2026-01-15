import "express-async-errors"

import cors from "cors"
import express from "express"

import { errorHandler } from "./middlewares/error-handler"
import { routes } from "./routes"

export const app = express()
app.use(cors())
app.use(express.json())

app.use(routes)

app.use(errorHandler)
