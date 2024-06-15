import { io } from "socket.io-client";

const socket = io({
  autoConnect: false,
  path: "/api/socket",
  addTrailingSlash: false,
  withCredentials: true,
});

export { socket };
