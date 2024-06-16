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
    const httpServer: HttpServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
      cors: {
        origin: "https://food-man-test.vercel.app",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      const locationId = socket.handshake.auth.locationId;
      if (!locationId) {
        console.error("Connection error: missing locationId");
        socket.disconnect(true);
        return;
      }
      socket.join(locationId);
      console.log(`Socket connected: ${socket.id} in room: ${locationId}`);

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
