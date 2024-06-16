// import { useAppSelector } from "@/store/hooks";
// import { Table } from "@prisma/client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { Socket } from "socket.io-client";
// import { socket as socketInstance } from "@/utils/socket";
// // import { io as ClientIO } from "socket.io-client";

// type SocketContextType = {
//   socket: Socket | null;
//   isConnected: boolean;
// };

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false,
// });

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const tables = useAppSelector((state) => state.table.items);
//   const [curTable, setCurTable] = useState<Table>();

//   useEffect(() => {
//     if (tables.length) {
//       setCurTable(tables[0]);
//     }
//   }, [tables]);

//   useEffect(() => {
//     if (curTable) {
//       //   const socketInstance = new (ClientIO as any)("http://localhost:3000", {
//       //     path: "/api/socket",
//       //     addTrailingSlash: false,
//       //     autoConnect: false,
//       //   });

//       socketInstance.auth = { locationId: curTable.locationId };
//       // 850ba6e1-6549-4e12-b01a-3044c442b024

//       socketInstance.connect();

//       socketInstance.on("connect", () => {
//         setIsConnected(true);
//       });

//       socketInstance.on("connect_error", (error: any) => {
//         console.log("socket connection error: ", error);
//       });

//       socketInstance.on("disconnect", () => {
//         setIsConnected(false);
//       });

//       setSocket(socketInstance);

//       return () => {
//         socketInstance.disconnect();
//       };
//     }
//   }, [curTable]);

//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
