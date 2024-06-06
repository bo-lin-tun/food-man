// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fileUpload } from "@/utils/fileUpload";
import { upload } from "@/utils/serverImage";
import { Request, Response } from "express";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: Request, res: Response) {
  try {
    if (req.method === "POST") {
      fileUpload(req, res, (error) => {
        if (error) {
          return res.status(500).send("Internal Server Error");
        }
        const files = req.files as Express.MulterS3.File[];
        const file = files[0];
        const assetUrl = file.location;
        res.status(200).json({ assetUrl });
      });

const Text = upload.any
console.log("Text",Text);

    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}
