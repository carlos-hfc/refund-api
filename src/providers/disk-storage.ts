import { promises } from "node:fs"
import path from "node:path"

import { TMP_FOLDER, UPLOAD_FOLDER } from "@/lib/multer"

export class DiskStorage {
  async saveFile(file: string) {
    const tmpPath = path.resolve(TMP_FOLDER, file)
    const destPath = path.resolve(UPLOAD_FOLDER, file)

    try {
      await promises.access(tmpPath)
    } catch (error) {
      console.log(error)

      throw new Error(`Arquivo nao encontrado: ${tmpPath}`)
    }

    await promises.mkdir(UPLOAD_FOLDER, { recursive: true })
    await promises.rename(tmpPath, destPath)

    return file
  }

  async deleteFile(file: string, type: "tmp" | "upload") {
    const pathFile = type === "tmp" ? TMP_FOLDER : UPLOAD_FOLDER
    const filePath = path.resolve(pathFile, file)

    try {
      await promises.stat(filePath)
    } catch {
      return
    }

    await promises.unlink(filePath)
  }
}
