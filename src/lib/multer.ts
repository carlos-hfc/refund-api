import crypto from "node:crypto"
import path from "node:path"

import multer from "multer"

export const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
export const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads")
export const MAX_FILE_SIZE = 1024 * 1024 * 3 //3MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(_, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex")
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    },
  }),
}

export default {
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MULTER,
}
