import { io } from "socket.io-client";

// https://food-man-test.vercel.app | http://localhost:3000

const socket = io("https://food-man-test.vercel.app", {
  autoConnect: false,
  path: "/api/socket",
  addTrailingSlash: false,
  withCredentials: true,
  rejectUnauthorized: false,
});

export { socket };
