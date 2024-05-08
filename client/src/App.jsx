import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const App = () => {
  const [message, setmessage] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [socketId, setSocketId] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [roomName, setRoomName] = useState("");
  const socket = useMemo(() => {
    return io("http://localhost:3000");
  }, []);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    console.log("logged");
    socket.emit("join-room",roomName);
    setRoomName("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected client", socket.id);
    });

    socket.on("receive-message", (data) => {
      setAllMessage((prev) => [...prev, data]);
      console.log(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { roomId, message });
  };
  return (
    <div>
      <form onSubmit={handleJoinRoom}>
        <input
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
          type="text"
        />
        <button type="submit" >join</button>
      </form>

      {socketId}
      <form onSubmit={handleSubmit}>
        <label>RoomId</label>
        <input
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          type="text"
        />
        <label>Message</label>
        <input
          onChange={(e) => {
            setmessage(e.target.value);
          }}
          type="text"
        />
        <button>Send</button>
        {allMessage.map((data) => {
          return <p key={data}>{data}</p>;
        })}
      </form>
    </div>
  );
};

export default App;
