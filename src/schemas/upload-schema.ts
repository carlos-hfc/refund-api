import z from "zod"

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/multer"

export const uploadSchema = z.object({
  filename: z.string().nonempty(),
  mimetype: z
    .string()
    .refine(
      type => ACCEPTED_IMAGE_TYPES.includes(type),
      `Invalid file type. Add file of type ${ACCEPTED_IMAGE_TYPES.join()}`,
    ),
  size: z
    .number()
    .positive()
    .refine(
      size => size <= MAX_FILE_SIZE,
      `Invalid file size. Add file with a maximum of 3MB`,
    ),
})

export type UploadSchema = z.infer<typeof uploadSchema>
