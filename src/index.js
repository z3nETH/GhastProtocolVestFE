import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain="arbitrum"
      dAppMeta={{
        name: "Ghast protocol",
        description: "Liquidation-free money market",
        logoUrl: "./images/ghastLogo.svg",
        url: "https://ghastprotocol.com/",
        isDarkMode: true,
      }}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
