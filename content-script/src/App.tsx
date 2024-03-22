import Logo from "./Logo";
import React, { useLayoutEffect, useState } from "react";
import ToggleGroupDemo from "./ToggleGroup";
import "./App.css";

import { useSession } from "./SessionProvider";
import { initialEdges, initialNodes } from "./initialData";
import ReactFlowWrapper from "./FlowApp";
import './index.css';

// TODO sessionId is a useState to fix the window sizing

function App() {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth * 0.75);
	const [showApp, setShowApp] = useState<boolean>(false);
	const [appWidth, setAppWidth] = useState<number>(window.innerWidth * 0.25)
	const { sessionId } = useSession();


	useLayoutEffect(() => {
		const checkLeftNavAndAdjust = () => {
			const leftNav: HTMLDivElement | null = document.querySelector("#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.flex-shrink-0.overflow-x-hidden.bg-token-sidebar-surface-primary");

			// Start polling for chatBody
			const intervalId = setInterval(() => {
				const chatBody: HTMLDivElement | null = document.querySelector("#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col");

				if (!!chatBody) {
					clearInterval(intervalId); // Stop polling once chatBody is found

					// Determine the new app width based on the existence of leftNav
					const newAppWidth = leftNav ? window.innerWidth * 0.25 : 0;

					// Update visibility based on the existence of leftNav
					setShowApp(!!leftNav);

					// Apply styles to chatBody
					chatBody.style.marginRight = `${newAppWidth}px`;
					chatBody.style.width = leftNav ? `calc(100% - ${newAppWidth}px)` : "unset";

					// Now, update the state with the new width for future use
					setAppWidth(newAppWidth);
				}
			}, 100); // Check every 100 milliseconds

			return intervalId;
		};

		const intervalId = checkLeftNavAndAdjust();

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
			checkLeftNavAndAdjust();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			clearInterval(intervalId); // Ensure to clear the interval on cleanup
			window.removeEventListener("resize", handleResize);
		};
	}, [windowWidth, sessionId]); // Dependencies

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

				<header className="App-header" style={{ height: '100vh', width: '100%' }}>
					<ReactFlowWrapper />


					{/* <FlowProvider /> */}
					{/* <FlowApp /> */}
					{/* <ToggleGroupDemo />
					<Logo className="App-logo" id="App-logo" title="React logo" />
					<p className="App-title"> Flow: A mind map for ChatGPT</p> */}
					{/* {/* <CustomNodeFlow appWidth={appWidth} /> */}

				</header>
			</div>
		</div >
	);
}

export default App;
