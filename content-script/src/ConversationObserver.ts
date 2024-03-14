import React, { useEffect } from 'react';

interface ConversationObserverProps { }

const ConversationObserver: React.FC<ConversationObserverProps> = () => {
    useEffect(() => {
        // Interval ID for clearing when the target element is found or component unmounts
        let intervalId: number | undefined;

        const waitForElement = () => {
            const targetChatElement: HTMLDivElement | null = document.querySelector('.flex.flex-col.text-sm.pb-9');

            if (!!targetChatElement) {
                console.log("Setting up observer on:", targetChatElement);

                const callback = (mutationsList: MutationRecord[], observer: MutationObserver) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                            mutation.addedNodes.forEach((textElement) => {
                                if (
                                    textElement.nodeType === Node.ELEMENT_NODE &&
                                    (textElement as Element).classList.contains('w-full') &&
                                    (textElement as Element).classList.contains('text-token-text-primary') &&
                                    (textElement as Element).hasAttribute('data-testid') &&
                                    (textElement as Element).getAttribute('data-testid')!.startsWith('conversation-turn-')
                                ) {
                                    console.log('A new conversation turn was added:', textElement);
                                }
                            });
                        }
                    }
                };

                const config: MutationObserverInit = { attributes: false, childList: true, subtree: true };
                const observer = new MutationObserver(callback);
                observer.observe(targetChatElement, config);

                // Clear the interval once the element is found and the observer is set up
                if (intervalId !== undefined) {
                    clearInterval(intervalId);
                }

                // Return a cleanup function to disconnect the observer
                return () => observer.disconnect();
            }
        };

        // Check every 500 milliseconds for the element
        intervalId = window.setInterval(waitForElement, 500);

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            if (intervalId !== undefined) {
                clearInterval(intervalId);
            }
        };
    }, []);

    return null; // This component does not render anything
};

export default ConversationObserver;
