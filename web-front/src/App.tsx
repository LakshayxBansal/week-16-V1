import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const[socket, setSocket] = useState();
  const inputRef = useRef();

  function sendMessage(){
    if(!socket){
      alert("Socket not connected");
      return;
    }
    const message = inputRef.current.value;
    inputRef.current.value = "";
    //@ts-ignore
    socket.send(message);
  }

  useEffect(() => {

    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = (event) => {
      alert(event.data);
    }
  },[])

  return (

    <div>
      <input ref = {inputRef}  type='text' placeholder='Enter your message'></input>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}


export default App;