import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_CLIENT_KEY!,
  {
    cluster: "ap1",
  }
);
