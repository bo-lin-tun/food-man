// import { Server as HttpServer } from "http";
// import { NextApiRequest } from "next";
// import { Server as ServerIO } from "socket.io";
// import { NextApiResponseWithSocket } from "@/utils/server";

// // Extend the interface
// declare module "socket.io" {
//   interface Socket {
//     locationId: string;
//   }
// }

// const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
//   if (!res.socket.server.io) {
//     const httpServer: HttpServer = res.socket.server as any;
//     const io = new ServerIO(httpServer, {
//       path: "/api/socket",
//       addTrailingSlash: false,
//       cors: {
//         origin: "https://food-man.vercel.app",
//         methods: ["GET", "POST"],
//         credentials: true,
//       },
//     });
//     let locationId: string;
//     io.use(async (socket, next) => {
//       locationId = socket.handshake.auth.locationId;
//       if (!locationId) {
//         return next(new Error("invalid locationId"));
//       }
//       socket.locationId = locationId;
//       socket.join(locationId);
//       next();
//     });
//     res.socket.server.io = io;
//   }
//   res.end();
// };

// export default ioHandler;
