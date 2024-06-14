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

// pos-image = msquarefdc
export const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "pos-images",
    acl: "public-read",
    key: (request, file, cb) => {
      cb(null, `food-man/bo-lin-tun/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);

export const generateLinkForQRCode = (tableId: string) => {
  return `${config.orderAppUrl}?tableId=${tableId}`;
};

export const getQrCodeUrl = (tableId: string) => {
  return `https://pos-images.sgp1.cdn.digitaloceanspaces.com/food-man/pos-images/qrcode/tableId-${tableId}.png`;
};

export const qrCodeImageUpload = async (tableId: string) => {
  try {
    const qrImageData = await QRCode.toDataURL(generateLinkForQRCode(tableId), {
      scale: 20,
    });
    const input = {
      Bucket: "pos-images",
      Key: `food-man/pos-images/qrcode/tableId-${tableId}.png`,
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
      Bucket: "pos-images",
      Key: assetUrl.split(".com/")[1],
    };
    const command = new DeleteObjectCommand(input);
    await s3Client.send(command);
  } catch (err) {
    console.error(err);
  }
};

