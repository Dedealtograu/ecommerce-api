import { randomUUID } from "crypto";
import { fileTypeFromBuffer } from "file-type";
import { getDownloadURL, getStorage } from "firebase-admin/storage";
import fs from "fs";
import { ValidationError } from "../errors/validation.error.js";

export class UploadFileService {
  constructor(private path: string = "") {}

  async upload(base64: string): Promise<string> {
    const fileBuffer = Buffer.from(base64, 'base64');
    const fileType = await fileTypeFromBuffer(fileBuffer);

    console.log(fileType?.mime);

    if (!fileType) {
      throw new ValidationError("Arquivo inválido");
    }

    if (fileType.mime !== "image/jpeg" && fileType.mime !== "image/png") {
      throw new ValidationError("A imagem deve estar no formato JPEG ou PNG");
    } 

    const fileName = `${randomUUID().toString()}.${fileType?.ext}`;
    fs.writeFileSync(fileName, fileBuffer);

    const bucket = getStorage().bucket("e-commerce-42ff1.firebasestorage.app");
    const uploadResponse = await bucket.upload(fileName, {
      destination: this.path + fileName
    });

    fs.unlinkSync(fileName);

    return getDownloadURL(uploadResponse[0]);
  }
}