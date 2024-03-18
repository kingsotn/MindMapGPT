import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { useSession } from './SessionProvider';
import { parse } from 'path';

const ConversationObserver: React.FC<{}> = () => {
    const { sessionId } = useSession();
    const observerRef = useRef<MutationObserver | null>(null);

    useEffect(() => {
        const isElementNode = (node: Node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE;

        const hasRequiredClasses = (element: Element): boolean =>
            element.classList.contains('w-full') && element.classList.contains('text-token-text-primary');

        const getTurnNumber = (element: Element): number | null => {
            const dataTestId = element.getAttribute('data-testid');
            const match = dataTestId?.match(/conversation-turn-(\d+)/);
            return match ? parseInt(match[1], 10) : null;
        };

        const parseChatDom = (turnNumber: number, messageDiv: Element) => {
            if (!messageDiv) return "div is null";

            const uuid = messageDiv.querySelector('[data-message-id]')?.getAttribute('data-message-id');
            const conversationTurnString = messageDiv.closest('[data-testid]')?.getAttribute('data-testid');
            const conversationTurn = conversationTurnString
                ? parseInt(conversationTurnString.match(/\d+$/)?.[0] ?? '0', 10)
                : null;

            let content =
                messageDiv.querySelector('[data-message-author-role="assistant"][data-message-id="17700b54-fa5a-46da-8caf-8dc71f7fe8e3"] .markdown p') ||
                messageDiv.querySelector('.markdown')?.textContent ||
                '';

            const role = isEven(turnNumber) ? "User" : 'Assistant';
            return { uuid, conversationTurn, role, content };
        }

        const isEven = (num: number): boolean => num % 2 === 0;

        const setupObserver = () => {

            const intervalId = setInterval(() => {
                const chatBody: HTMLDivElement | null = document.querySelector('.flex.flex-col.text-sm.pb-9');

                // console.log(!!chatBody && !observerRef.current);
                // console.log(!!chatBody);
                // console.log(!observerRef.current)
                if (!!chatBody && !observerRef.current) {
                    console.log("sessionId:", sessionId);
                    console.log("Setting up observer on:", chatBody);

                    const callback = (mutationsList: MutationRecord[]) => {
                        for (const mutation of mutationsList) {
                            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                                mutation.addedNodes.forEach((textElement) => {
                                    if (
                                        isElementNode(textElement) &&
                                        hasRequiredClasses(textElement as Element) &&
                                        (textElement as Element).hasAttribute('data-testid')
                                    ) {
                                        const turnNumber = getTurnNumber(textElement as Element);
                                        if (turnNumber !== null) {
                                            console.log(`A new conversation turn was added: ${isEven(turnNumber) ? 'Assistant' : 'User'}`, textElement);
                                            // TODO: Additional logic based on turnNumber's parity

                                            // parse the dom, put those params into addChatNode()
                                            const out = parseChatDom(turnNumber, textElement);
                                            console.log(out);

                                            // call createChatNode()
                                        }
                                    }
                                });
                            }
                        }
                    };
                    observerRef.current = new MutationObserver(callback);
                    observerRef.current.observe(chatBody, { childList: true, subtree: true });
                }

            }, 100);


        };

        setupObserver();

        // const intervalId = setInterval(() => {
        //     const currentSessionId = sessionId;
        //     console.log("curSesh: ", sessionId)
        //     if (sessionId !== currentSessionId) {
        //         // setSessionId(currentSessionId);
        //         if (observerRef.current) {
        //             observerRef.current.disconnect();
        //             observerRef.current = null;
        //         }
        //         setupObserver();
        //     } else if (!observerRef.current) {
        //         setupObserver();
        //     }
        // }, 500);

        // Cleanup function
        return () => {
            // clearInterval(intervalId);
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, [sessionId]); // Dependency on sessionId to reset observer if it changes

    return null; // This component does not render anything
};

export default ConversationObserver;
