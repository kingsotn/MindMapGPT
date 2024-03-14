import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";
import ConversationObserver from "./ConversationObserver";
import { SessionProvider } from "./SessionProvider";

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
            {/* session provider wrapped to provide sessionId context */}
            <SessionProvider>
                <ConversationObserver />
                <App />
            </SessionProvider>
        </React.StrictMode>,
    );
} else {
    console.error("Failed to find or create root element for React app");
}
