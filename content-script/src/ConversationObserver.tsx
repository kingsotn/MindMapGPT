import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { useSession } from './SessionProvider';
import MindMapProvider, { useMindMap, ChatNode, ChatNodePair } from './MindMapProvider';
import { ReactFlowAutoLayout } from './FlowApp';

const ConversationObserver: React.FC<{}> = () => {
    const { sessionId } = useSession();
    const observerRef = useRef<MutationObserver | null>(null);
    const { addChatNodePair } = useMindMap();
    const mutationSessionIdRef = useRef(sessionId);

    useEffect(() => {
        const isElementNode = (node: Node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE;

        const hasRequiredClasses = (element: Element): boolean =>
            element.classList.contains('w-full') && element.classList.contains('text-token-text-primary');

        const getTurnNumber = (element: Element): number | null => {
            const dataTestId = element.getAttribute('data-testid');
            const match = dataTestId?.match(/conversation-turn-(\d+)/);
            return match ? parseInt(match[1], 10) : null;
        };

        const parseDomToChatNode = (turnNumber: number, messageDiv: Element): ChatNode => {
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

            if (uuid === undefined || uuid === null) {
                throw new Error('UUID is null or undefined');
            }

            if (conversationTurnString === null) {
                throw new Error('conversationTurnString is null');
            }

            if (content === null) {
                throw new Error('Content is null');
            }

            console.log(isEven(turnNumber) ? "Assistant" : "User", uuid.slice(-14), conversationTurn, content);
            return {
                uuid: uuid || '',
                conversationTurn: conversationTurn || 0,
                role: isEven(turnNumber) ? "User" : "Assistant",
                content: content as string, // Ensure this is a string or handled accordingly
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
            const chatBlockSelector = '.flex.flex-col.text-sm.pb-9'
            waitForDomLoad(chatBlockSelector, 1000, (chatBody) => {


                // if user switches chats
                if (mutationSessionIdRef.current !== sessionId) {
                    // !! TODO. figure this out.... idk how to init a new reactflow layout.
                    // console.log("sess aint the same!", mutationSessionIdRef.current, sessionId);
                    // ReactFlowAutoLayout();

                    console.log("set new Id");
                    mutationSessionIdRef.current = sessionId;
                }

                // Assuming observerRef is properly initialized and accessible here
                if (observerRef.current) return;

                console.log("Setting up observer on:", chatBody);

                const callback = (mutationsList: MutationRecord[]) => {
                    let chatNodePair: ChatNodePair = {
                        uuid: "",
                        userNode: {} as ChatNode,
                        assistantNode: {} as ChatNode,
                        children: new Map()
                    };

                    const relevantMutations = mutationsList.filter(mutation =>
                        mutation.type === 'childList' &&
                        mutation.addedNodes.length > 0 &&
                        mutation.target instanceof Element &&
                        mutation.target.querySelector('.flex-col.gap-1.md\\:gap-3')
                    );

                    if (relevantMutations.length > 0) {
                        handleMutations(relevantMutations, chatNodePair);
                    }
                };

                observerRef.current = new MutationObserver(callback);
                observerRef.current.observe(chatBody, { childList: true, subtree: true });
            });
        };
        const handleMutations = (mutationsList: MutationRecord[], chatNodePair: ChatNodePair) => {
            console.log("found mutation")

            // Flag to check if chatNodePair is updated to decide on calling addChatNodePair
            let isChatNodePairUpdated = false;

            mutationsList.forEach(mutation => {
                mutation.addedNodes.forEach((textElement) => {
                    if (
                        isElementNode(textElement) &&
                        hasRequiredClasses(textElement as Element) &&
                        (textElement as Element).hasAttribute('data-testid')
                    ) {
                        const turnNumber = getTurnNumber(textElement as Element);
                        if (turnNumber !== null) {
                            // Parse the DOM node to create a ChatNode
                            const chatNodeParsed = parseDomToChatNode(turnNumber, textElement);

                            // Update the chatNodePair based on the turn number
                            if (isEven(turnNumber)) {
                                chatNodePair.assistantNode = chatNodeParsed;
                            } else {
                                chatNodePair.userNode = chatNodeParsed;
                                chatNodePair.uuid = chatNodeParsed.uuid; // Assuming UUID is updated for user nodes
                            }

                            isChatNodePairUpdated = true;
                        }
                    }
                });
            });

            // If chatNodePair was updated, add it to the MindMap
            if (isChatNodePairUpdated) {
                addChatNodePair(chatNodePair);
                console.log("chatNodePair added:", chatNodePair);
            }
        };

        setupObserver();
        console.log("sesh", sessionId)

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
