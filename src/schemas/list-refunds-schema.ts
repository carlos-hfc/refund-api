import z from "zod"

export const listRefundsQuerySchema = z.object({
  name: z.string().optional(),
  page: z.string().optional(),
  perPage: z.string().optional(),
})

export type ListRefundsQuerySchema = z.infer<typeof listRefundsQuerySchema>
