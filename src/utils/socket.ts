import { io } from "socket.io-client";

const socket = io("https://food-man-test.vercel.app/", {
  autoConnect: false,
  path: "/api/socket",
  addTrailingSlash: false,
  withCredentials: true,
});

export { socket };
