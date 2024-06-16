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
    console.log("Initializing new Socket.io server...");
    const httpServer: HttpServer = res.socket.server;
    // https://food-man-test.vercel.app | http://localhost:3000
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "https://food-man-test.vercel.app",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // Middleware for authentication and validation
    io.use(async (socket, next) => {
      const locationId = socket.handshake.auth.locationId;
      console.log("Middleware running... Location ID:", locationId);
      if (!locationId) {
        // console.error("Middleware error: missing locationId");
        return next(new Error("Authentication error: missing locationId"));
      }
      socket.locationId = locationId;
      next();
    });

    io.on("connection", (socket) => {
      const locationId = socket.locationId;
      console.log(`Joining room with locationId: ${locationId}`);
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
