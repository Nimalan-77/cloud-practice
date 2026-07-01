import { useState } from "react";

function App() {
  const [text, setText] = useState("");

  const sendData = async () => {
    await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });
  };

  return (
    <div>
      <h1>Simple App</h1>
      <input onChange={(e) => setText(e.target.value)} />
      <button onClick={sendData}>Send</button>
    </div>
  );
}

export default App;