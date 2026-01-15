import { NextFunction, Request, Response } from "express"
import z from "zod"

interface Schema {
  query?: z.ZodObject<any, any>
  body?: z.ZodObject<any, any>
  params?: z.ZodObject<any, any>
}

export function validationSchema({ body, params, query }: Schema) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      if (params) params.parse(request.params)
      if (query) query.parse(request.query)
      if (body) body.parse(request.body)

      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          message: "Validation error",
          issues: error.format(),
          statusCode: 400,
        })
      }

      next(error)
    }
  }
}
