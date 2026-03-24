import { v2 as cloudinary } from "cloudinary";
import ClientError from "../errors/clientError.js";
import { StatusCodes } from "http-status-codes";
import streamifier from "streamifier";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Missing Cloudinary Configuration");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export const uploadToCloudinary = async (files: Express.Multer.File[]) => {
  try {
    if (!files || files.length === 0) {
      throw new ClientError({
        explanation: "Invalid data sent from the client",
        message: "No files provided",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const uploadedUrl = await Promise.all(
      files.map(
        (file) =>
          new Promise<{
            fileUrl: string;
            fileName: string;
            fileType: string;
          }>((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
              {
                resource_type: "auto",

              },
              (error, result) => {
                if (error || !result) {
                  return reject(error ?? new Error("Upload failed"));
                }

                resolve({
                  fileUrl: result.secure_url,
                  fileName: result.original_filename || file.originalname,
                  fileType: result.format || file.mimetype,
                });
              }
            );

            streamifier.createReadStream(file.buffer).pipe(upload);
          })
      )
    );

    return uploadedUrl;
  } catch (error) {
    throw error;
  }
};