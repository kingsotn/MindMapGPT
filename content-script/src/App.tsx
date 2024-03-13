/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import Logo from "./Logo";
import React, { useEffect } from "react";
import "./App.css";

function App() {
	useEffect(() => {
		const chatBodySelector: string = "#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col";
		const chatBody: HTMLDivElement | null = document.querySelector(chatBodySelector);

		if (chatBody) {
			const sidebarWidthPercentage = 12; // Adjusted to match the sidebar width
			const sidebarWidth = (window.innerWidth * sidebarWidthPercentage) / 100;

			// Update the main content's margin and padding to avoid overlapping with the sidebar
			chatBody.style.marginRight = `${sidebarWidth}px`;
			chatBody.style.width = `calc(100% - ${sidebarWidth}px)`; // Adjust the width of the chatBody to prevent overlap

			// Optional: Cleanup function to reset styles when the component unmounts
			return () => {
				chatBody.style.marginRight = "";
				chatBody.style.width = "";
			};
		}
	}, []); // Empty dependency array means this effect runs once on mount

	const sidebarStyle = {
		position: "fixed" as "fixed",
		top: 0,
		right: 0,
		width: "25%", // Sidebar takes up the right quarter of the width
		height: "100vh", // Extend from top to bottom of the viewport
		zIndex: 1000,
	};

	return (
		<div style={sidebarStyle}>
			<div className="App">
				<header className="App-header">
					<Logo className="App-logo" id="App-logo" title="React logo" />
					<p>Hello, World</p>
					<p>I'm a Chrome Extension content-script!</p>
				</header>
			</div>
		</div>
	);
}

export default App;
