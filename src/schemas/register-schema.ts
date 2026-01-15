import { UserRole } from "@prisma/client"
import z from "zod"

export const registerBodySchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).default("employee"),
})

export type RegisterBodySchema = z.infer<typeof registerBodySchema>
