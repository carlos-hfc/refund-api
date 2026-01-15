import { Category } from "@prisma/client"
import z from "zod"

export const createRefundBodySchema = z.object({
  name: z.string().nonempty(),
  category: z.nativeEnum(Category),
  amount: z.number().positive(),
  filename: z.string().nonempty(),
})

export type CreateRefundBodySchema = z.infer<typeof createRefundBodySchema>
