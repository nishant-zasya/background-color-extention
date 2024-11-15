import viteLogo from "/vite.svg";
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
    <div className="flex justify-center w-screen">
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <a href="https://vite.dev" target="_blank" className="mb-6">
          <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
        </a>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
          <label className="block text-lg font-medium text-gray-700 mb-4">
            Choose Background Color
          </label>
          <div className="relative">
            <input
              type="color"
              onChange={(e) => setColor(e.currentTarget.value)}
              value={color}
              className="w-full h-10 p-0 cursor-pointer border rounded-lg border-gray-300"
            />
          </div>
          <button
            onClick={() => onClickHandle()}
            className="w-full mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Apply Color
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
