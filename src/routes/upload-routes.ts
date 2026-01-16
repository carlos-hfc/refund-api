import { Router } from "express"
import multer from "multer"

import { UploadController } from "@/controller/upload-controller"
import { MULTER } from "@/lib/multer"
import { validationSchema } from "@/middlewares/validation-schema"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import { uploadSchema } from "@/schemas/upload-schema"

export const uploadRoutes = Router()

const uploadController = new UploadController()

const upload = multer(MULTER)

uploadRoutes.use(verifyUserRole("employee"))
uploadRoutes.post(
  "/",
  upload.single("file"),
  validationSchema({
    file: uploadSchema,
  }),
  uploadController.upload,
)
