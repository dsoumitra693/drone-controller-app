import React, { createContext, useContext, useEffect, useState } from 'react';

interface ISocketContext {
  sendData: (data: string) => void;
  receivedData: string;
  isConnected: boolean;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

const SERVER_URL = "ws://192.168.192.189:81";

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("Socket context is not defined");
  }
  return context;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [receivedData, setReceivedData] = useState<string>("");

  useEffect(() => {
    let socket: WebSocket | null = null;
    let pingInterval: NodeJS.Timeout | null = null;
    let pongTimeout: NodeJS.Timeout | null = null;

    const connectWebSocket = () => {
      socket = new WebSocket(SERVER_URL);
      setWs(socket);

      socket.onopen = () => {
        setIsConnected(true);
        console.log("WebSocket connected");

        // Start the ping-pong mechanism
        pingInterval = setInterval(() => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send("ping");

            // Wait for pong response within 5 seconds
            pongTimeout = setTimeout(() => {
              if (isConnected) {
                setIsConnected(false);
                console.log("WebSocket disconnected due to no pong response");
                if (socket) {
                  socket.close();
                }
              }
            }, 5000);
          }
        }, 10000); // Ping every 10 seconds
      };

      socket.onmessage = (e) => {
        const message = e.data;

        if (message === "pong") {
          // Received pong response, clear the pong timeout
          if (pongTimeout) {
            clearTimeout(pongTimeout);
          }
        } else {
          // Handle other incoming messages
          setReceivedData(message);
        }
      };

      socket.onerror = (e) => {
        console.log('WebSocket Error:', e);
        setIsConnected(false);
      };

      socket.onclose = (e) => {
        console.log('WebSocket Connection Closed:', e);
        setIsConnected(false);
        if (pingInterval) {
          clearInterval(pingInterval);
        }
        if (pongTimeout) {
          clearTimeout(pongTimeout);
        }
        if (!e.wasClean) {
          // Connection closed unexpectedly (not by client)
          setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
        }
      };
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
        setIsConnected(false);
      }
      if (pingInterval) {
        clearInterval(pingInterval);
      }
      if (pongTimeout) {
        clearTimeout(pongTimeout);
      }
    };
  }, []);

  const sendData = (data: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  };

  return (
    <SocketContext.Provider value={{ sendData, isConnected, receivedData }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
