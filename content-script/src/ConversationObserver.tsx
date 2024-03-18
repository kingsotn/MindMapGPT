import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { useSession } from './SessionProvider';
import MindMapProvider, { useMindMap, ChatNode, ChatNodePair } from './MindMapProvider';


const ConversationObserver: React.FC<{}> = () => {
    const { sessionId } = useSession();
    const observerRef = useRef<MutationObserver | null>(null);
    const { addChatNode } = useMindMap();

    useEffect(() => {
        const isElementNode = (node: Node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE;

        const hasRequiredClasses = (element: Element): boolean =>
            element.classList.contains('w-full') && element.classList.contains('text-token-text-primary');

        const getTurnNumber = (element: Element): number | null => {
            const dataTestId = element.getAttribute('data-testid');
            const match = dataTestId?.match(/conversation-turn-(\d+)/);
            return match ? parseInt(match[1], 10) : null;
        };

        const parseChatDomToNode = (turnNumber: number, messageDiv: Element): ChatNode => {
            // console.log("parsing")
            if (!messageDiv) throw "div is null";

            const uuid = messageDiv.querySelector('[data-message-id]')?.getAttribute('data-message-id');
            const conversationTurnString = messageDiv.closest('[data-testid]')?.getAttribute('data-testid');
            const conversationTurn = conversationTurnString
                ? parseInt(conversationTurnString.match(/\d+$/)?.[0] ?? '0', 10)
                : null;

            let content =
                messageDiv.querySelector('[data-message-author-role="assistant"][data-message-id="17700b54-fa5a-46da-8caf-8dc71f7fe8e3"] .markdown p') ||
                messageDiv.querySelector('.markdown')?.textContent ||
                '';

            // const role = isEven(turnNumber) ? "User" : 'Assistant';
            // console.log(`${role}: `, uuid, conversationTurn, role, content);
            // console.log("returning")
            console.log(`A new conversation turn was added: ${isEven(turnNumber) ? 'Assistant' : 'User'}`);
            console.log(uuid, conversationTurn, isEven(turnNumber) ? "User" : "Assistant", content)

            return {
                uuid: uuid || '', // Make sure you have a valid UUID or handle this accordingly
                conversationTurn: conversationTurn || 0,
                role: isEven(turnNumber) ? "User" : "Assistant",
                content: content as string, // Ensure this is a string or handled accordingly
                children: new Map(), // Initialize an empty Map for children
            };
        }

        const isEven = (num: number): boolean => num % 2 === 0;

        function waitForDomLoad(selector: string, interval: number, callback: (element: HTMLElement) => void) {
            let intervalId: NodeJS.Timeout | null = null;

            const checkForElement = () => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(intervalId!); // Stop the interval if element is found
                    callback(element as HTMLElement);
                }
            };

            intervalId = setInterval(checkForElement, interval);
        }

        const setupObserver = () => {
            waitForDomLoad('.flex.flex-col.text-sm.pb-9', 1000, (chatBody) => {
                if (observerRef.current) return; // Exit if observer is already set up

                console.log("Setting up observer on:", chatBody);

                const callback = (mutationsList: MutationRecord[]) => {
                    let chatNodePair: ChatNodePair = {
                        userNode: {} as ChatNode,
                        assistantNode: {} as ChatNode
                    };
                    handleMutations(mutationsList, chatNodePair);
                };

                observerRef.current = new MutationObserver(callback);
                observerRef.current.observe(chatBody, { childList: true, subtree: true });
            });
        };


        const handleMutations = (mutationsList: MutationRecord[], chatNodePair: ChatNodePair) => {
            // console.log("len:", mutationsList.length)
            // console.log("mutations:", mutationsList)
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && mutation.target instanceof Element && mutation.target.querySelector('.flex-col.gap-1.md\\:gap-3')) {
                    mutation.addedNodes.forEach((textElement) => {
                        if (
                            isElementNode(textElement) &&
                            hasRequiredClasses(textElement as Element) &&
                            (textElement as Element).hasAttribute('data-testid')
                        ) {
                            const turnNumber = getTurnNumber(textElement as Element);
                            if (turnNumber !== null) {

                                // Parse the DOM and create a new ChatNode
                                const chatNodeParsed = parseChatDomToNode(turnNumber, textElement);

                                // Assign the parsed node to the appropriate property of chatNodePair using a ternary operator
                                isEven(turnNumber)
                                    ? (chatNodePair.assistantNode = chatNodeParsed)
                                    : (chatNodePair.userNode = chatNodeParsed);
                            }
                        }
                        console.log("chatNodePair:", chatNodePair);
                    });
                }
            }
            // At this point, chatNodePair will contain both userNode and assistantNode
        };

        setupObserver();

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
