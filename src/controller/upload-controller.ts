import { Request, Response } from "express"
import { ZodError } from "zod"

import { DiskStorage } from "@/providers/disk-storage"
import { ClientError } from "@/utils/client-error"

export class UploadController {
  async upload(request: Request, response: Response) {
    const diskStorage = new DiskStorage()

    try {
      const filename = await diskStorage.saveFile(request.file?.filename ?? "")

      return response.json({ filename })
    } catch (error) {
      if (error instanceof ZodError) {
        if (request.file) {
          await diskStorage.deleteFile(request.file.filename, "tmp")
        }

        throw new ClientError(error.issues[0].message)
      }

      throw error
    }
  }
}
