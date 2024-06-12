import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import QRCode from "qrcode";
import { config } from "./config";

const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: (request, file, cb) => {
      cb(null, `foodie-pos/bo-lin-tun/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);

export const generateLinkForQRCode = (tableId: string) => {
  return `${config.orderAppUrl}?tableId=${tableId}`;
};

export const getQrCodeUrl = (tableId: string) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/msquarefdc/qrcode/tableId-${tableId}.png`;
};

export const qrCodeImageUpload = async (tableId: string) => {
  try {
    const qrImageData = await QRCode.toDataURL(generateLinkForQRCode(tableId), {
      scale: 20,
    });
    const input = {
      Bucket: "msquarefdc",
      Key: `foodie-pos/msquarefdc/qrcode/tableId-${tableId}.png`,
      ACL: "public-read",
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    // @ts-ignore
    const command = new PutObjectCommand(input);
    await s3Client.send(command);
  } catch (err) {
    console.log(err);
  }
};

export const deleteOldMenuImage = async (assetUrl: string) => {
  try {
    const input = {
      Bucket: "msquarefdc",
      Key: assetUrl.split(".com/")[1],
    };
    const command = new DeleteObjectCommand(input);
    await s3Client.send(command);
  } catch (err) {
    console.error(err);
  }
};

// import fs from "fs";
// import path from "path";
// import multer from "multer";
// import QRCode from "qrcode";
// import { config } from "./config";

// // Define the local storage directory
// //  const storageDir = path.join('D:', 'uploads');

// const storageDir = path.join(process.cwd(), "public", "uploads");


// // Ensure the storage directory exists
// if (!fs.existsSync(storageDir)) {
//   fs.mkdirSync(storageDir, { recursive: true });
// }

// // Multer configuration for file uploads
// export const fileUpload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, storageDir);
//     },
//     filename: (req, file, cb) => {
//       cb(null, `foodie-pos-bo-lin-tun-${Date.now()}_${file.originalname}`);
//     },
//   }),
// }).array("files", 1);

// // Generate a link for QR code
// export const generateLinkForQRCode = (tableId: string): string => {
//   return `${config.orderAppUrl}?tableId=${tableId}`;
// };

// // Get the path for the QR code image
// export const getQrCodePath = (tableId: string): string => {
//   return path.join(storageDir, `tableId-${tableId}.png`);
// };

// // Upload QR code image locally
// export const qrCodeImageUpload = async (tableId: string): Promise<void> => {
//   try {
//     const qrImageData = await QRCode.toDataURL(generateLinkForQRCode(tableId), {
//       scale: 20,
//     });
//     const qrImageBuffer = Buffer.from(
//       qrImageData.replace(/^data:image\/\w+;base64,/, ""),
//       "base64"
//     );
//     const qrCodePath = getQrCodePath(tableId);

//     fs.writeFileSync(qrCodePath, qrImageBuffer);
 
//   } catch (err) {
//     console.error("Error uploading QR code image:", err);
//   }
// };

// // Delete old menu image locally
// export const deleteOldMenuImage = async (filePath: string): Promise<void> => {
//   try {
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
     
//     } else {
     
//     }
//   } catch (err) {
//     console.error("Error deleting old menu image:", err);
//   }
// };
