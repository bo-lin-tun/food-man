import { Server as HttpServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseWithSocket } from "@/utils/server";

// Extend the interface
declare module "socket.io" {
  interface Socket {
    locationId: string;
  }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const httpServer: HttpServer = res.socket.server as any;
    const io = new ServerIO(httpServer);
    io.use(async (socket, next) => {
      const locationId = socket.handshake.auth.locationId;
      console.log("locationId In Socket: ", locationId);
      if (!locationId) {
        return next(new Error("invalid locationId"));
      }
      socket.locationId = locationId;
      console.log("socket.username: ", socket.locationId);
      socket.join(locationId);
      next();
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
