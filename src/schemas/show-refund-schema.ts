import z from "zod"

export const showRefundParamSchema = z.object({
  id: z.string().uuid(),
})

export type ShowRefundParamSchema = z.infer<typeof showRefundParamSchema>
