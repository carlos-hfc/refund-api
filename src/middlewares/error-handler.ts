import { ErrorRequestHandler } from "express"
import { ZodError } from "zod"

import { ClientError } from "@/utils/client-error"

export const errorHandler: ErrorRequestHandler = (error, _, response, next) => {
  if (error instanceof ClientError) {
    return response.status(error.statusCode).json(error)
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation error",
      issues: error.format(),
      statusCode: 400,
    })
  }

  return response.status(500).json({ message: error.message })
}
