// // pages/api/upload.ts
// import nextConnect from 'next-connect';
// import multer from 'multer';
// import path from 'path';
// import type { NextApiRequest, NextApiResponse } from 'next';

// // Set up Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Replace with your desired upload directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Create API route handler
// const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Something went wrong! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' not allowed` });
//   },
// });

// apiRoute.use(upload.single('file')); // 'file' is the name of the form field

// apiRoute.post((req, res) => {
//   res.status(200).json({ data: 'File uploaded successfully!' });
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parsing for file uploads
//   },
// };
