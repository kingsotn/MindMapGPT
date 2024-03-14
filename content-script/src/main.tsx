import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";
import ConversationObserver from "./ConversationObserver";

// Create a new div element for the React app if it doesn't already exist
const appRootId = "react-app-root";
let appRootElem = document.getElementById(appRootId);
if (!appRootElem) {
    appRootElem = document.createElement("div");
    appRootElem.id = appRootId;
    document.body.appendChild(appRootElem);
}

// Ensure TypeScript knows the element exists
if (appRootElem) {
    const root = createRoot(appRootElem);
    root.render(
        <React.StrictMode>
            <ConversationObserver />
            <App />
        </React.StrictMode>,
    );
} else {
    console.error("Failed to find or create root element for React app");
}
