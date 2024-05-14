// import { Server as NetServer, Socket } from "net";
// import { NextApiResponse } from "next";
// import { Server as SocketIOServer } from "socket.io";

// export type NextApiResponseServerIo = NextApiResponse & {
//   socket: Socket & {
//     server: NetServer & {
//       io: SocketIOServer;
//     };
//   };
// };

import type { Server as HTTPServer } from "http";
import type { NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import { Server as IOServer } from "socket.io";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}
