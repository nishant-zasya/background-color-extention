import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [color, setColor] = useState<string>("");

  const onClickHandle = async () => {
    const [tab] = await chrome.tabs.query({ active: true });

    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
    });
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>My vite extension</h1>
      <div className="card">
        <input
          type="color"
          onChange={(e) => setColor(e.currentTarget.value)}
          value={color}
        />
        <button onClick={() => onClickHandle()}>Click me</button>
      </div>
    </>
  );
}

export default App;
