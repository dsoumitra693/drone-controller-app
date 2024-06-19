import React, { useContext, useEffect, useState } from 'react'

interface ISocketContext{
  sendData:(data:string)=>void;
  recivedData:string;
  isConnected:boolean;
}
interface SocketProviderProps{
  children:React.ReactNode
}

const SERVER_URL = "ws://192.168.239.189:81"

const SocketContext = React.createContext<ISocketContext| null>(null)

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
      throw new Error("Socket context is not define");
  }
  return context;
};


const SocketProvider:React.FC<SocketProviderProps> = ({children}) => {
  const [ws, setWs] = useState<WebSocket>();
  const [isConnected, setIsConneted] = useState<boolean>(false)
  const [data, setData] = useState<string>("")

  useEffect(() => {
    const socket = new WebSocket(SERVER_URL);

    socket.onopen = () => {
      setIsConneted(true)
      setWs(socket);
    };

    socket.onmessage = (e) => {
      setData(e.data)
    };

    socket.onerror = (e) => {
      console.error('WebSocket Error');
    };

    socket.onclose = (e) => {
      setIsConneted(false)
    };

    return () => {
      socket?.close();
      setIsConneted(false)
    };
  }, []);

  const sendData = (data: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  };
  return (
    <SocketContext.Provider value={{ sendData, isConnected,  recivedData:data}}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider