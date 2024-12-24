import path from "path";
import multer, { FileFilterCallback } from "multer";
import crypto from "crypto";

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limita o tamanho do arquivo para 10MB
  },
  fileFilter(
    request: Express.Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) {
    // Aceita apenas arquivos PDF
    if (file.mimetype === "application/pdf") {
      callback(null, true); // Aceita o arquivo
    } else {
      callback(null, false); // Se não for PDF, rejeita o arquivo sem gerar erro
    }
  },
};
