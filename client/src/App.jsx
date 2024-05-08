import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const App = () => {
  const [massage,setMassage] = useState([])
  const socket = useMemo(() => {
    return io("http://localhost:3000");
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected client", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", massage);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e)=>{setMassage(e.target.value)}} type="text" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default App;
