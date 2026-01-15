import z from "zod"

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
})

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>
