import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
  process.env.PUSHER_CLIENT_KEY!,
  {
    cluster: "ap1",
  }
);
