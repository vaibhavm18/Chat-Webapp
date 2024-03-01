import { ReactNode, createContext, useContext, useMemo } from "react";
import { Socket, io } from "socket.io-client";

export type SocketType = Socket<any, any> | null;
const SocketContext = createContext<SocketType>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

const URL = import.meta.env.VITE_URL;
type Props = {
  children: ReactNode;
};
export const SocketProvider = (props: Props) => {
  const socket = useMemo(() => io(URL + "/"), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
