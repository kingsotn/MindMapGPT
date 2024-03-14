import Logo from "./Logo";
import React, { useEffect, useState } from "react";
import ToggleGroupDemo from "./ToggleGroup";
import "./App.css";
import CustomNodeFlow from "./Nodes";
import ConversationObserver from "./ConversationObserver";

function App() {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const [showApp, setShowApp] = useState<boolean>(false);
	const [appWidth, setAppWidth] = useState<number>(window.innerWidth * 0.25)

	useEffect(() => {
		const checkLeftNavAndAdjust = (): void => {

			const leftNav: HTMLDivElement | null = document.querySelector("#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.flex-shrink-0.overflow-x-hidden.bg-token-sidebar-surface-primary");
			const chatBody: HTMLDivElement | null = document.querySelector("#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col");

			// Update visibility based on the existence of leftNav
			setShowApp(!!leftNav);
			if (!!chatBody) {
				if (leftNav) {
					setAppWidth(window.innerWidth * 0.25);
					chatBody.style.marginRight = `${appWidth}px`;
					chatBody.style.width = `calc(100% - ${appWidth}px)`;
				} else {
					setAppWidth(0);
					chatBody.style.marginRight = `${0}px`;
					chatBody.style.width = "unset";
				}
			}

			// console.log(`appWidth: ${appWidth}`);
			// console.log(`windowWidth: ${windowWidth}`);
		};

		const handleResize = (): void => {
			setWindowWidth(window.innerWidth);
			checkLeftNavAndAdjust();
		};

		window.addEventListener("resize", handleResize);
		checkLeftNavAndAdjust(); // Initial check and adjustment

		return (): void => {
			window.removeEventListener("resize", handleResize);
		};
	}, [windowWidth]); // The dependency on windowWidth ensures the effect runs on resize

	if (!showApp) {
		return null; // Or return an alternative UI
	}

	const appStyle: React.CSSProperties = {
		position: "fixed",
		top: 0,
		right: 0,
		width: "25%",
		height: "100vh",
		zIndex: 1000,
	};

	return (
		<div style={appStyle}>
			<div className="App">
				<header className="App-header">
					<ToggleGroupDemo />
					<Logo className="App-logo" id="App-logo" title="React logo" />
					<p className="App-title"> Flow: A mind map for ChatGPT</p>

					{/* <CustomNodeFlow appWidth={appWidth} /> */}
				</header>
			</div>
		</div>
	);
}

export default App;
