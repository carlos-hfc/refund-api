import z from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
