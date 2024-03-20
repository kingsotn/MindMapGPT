// ChatNodeContext.tsx

// Role: Serves as the context provider of MindMap. It manages the state of the mind map (e.g., nodes and lastNodeOnDom) and provides functions to modify this state (e.g., addChatNodePair).
// State Management: Uses refs or state hooks (e.g., useState, useRef) to keep track of the current state. When the state updates, it should provide the new state to through the context.
// UI Updates Trigger: When addChatNodePair is called, and a new node is successfully added, it updates the mind map's state. This change in state (or refs, if you're using them to track mutable data without causing re-renders) should be propagated through the context to any consuming components.

import React, { createContext, useContext, useState, useRef } from 'react';
import { useSession } from './SessionProvider';
// import { updateMindMapUI } from './ReactFlowUI';


type Role = "User" | "Assistant" | "System";

export interface ChatNode {
    // given
    uuid: string;
    conversationTurn: number;
    role?: Role; // user | assistant | system
    content?: string;

}

export interface ChatNodePair {
    uuid: string; // just use the User's uuid
    userNode?: ChatNode
    assistantNode?: ChatNode

    // set
    children: Map<string, ChatNodePair>; // {uuid : ChatNodePair...}
    parent?: ChatNodePair | null; // Optional reference to the parent node
}

const defaultSystem: ChatNodePair = {
    uuid: 'systemChatNode',
    // content: // TODO: this can actually be parsed down the future (system msg)
    parent: null, // The parent of defaultSystem is null initially
    children: new Map<string, ChatNodePair>(),
};

const defaultHead: ChatNodePair = {
    uuid: 'headChatNode',
    children: new Map<string, ChatNodePair>([[defaultSystem.uuid, defaultSystem]]),
    // Assign defaultSystem as a child of defaultHead
};

// Assign defaultHead as the parent of defaultSystem
defaultSystem.parent = defaultHead;

// Default context value incorporating the head root
const defaultMindMapContextValue = {
    sessionId: '', // Assuming an empty string or some initial value
    nodes: new Map([[defaultSystem.uuid, defaultSystem]]),
    addChatNodePair: (node: ChatNodePair) => { }, // Stub function, since we can't add nodes without the provider
    lastNodeOnDom: defaultSystem,
};

// Creating the context with the default value
const MindMapContext = createContext(defaultMindMapContextValue);

const MindMapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { sessionId } = useSession();
    const nodes = useRef<Map<string, ChatNodePair>>(new Map([[defaultHead.uuid, defaultHead], [defaultSystem.uuid, defaultSystem]]));
    const lastNodeOnDomRef = useRef<ChatNodePair>(defaultSystem);


    const addChatNodePair = (node: ChatNodePair) => {
        // Access the current value of the nodes ref
        const updatedNodes = new Map(nodes.current);

        // Access the most current lastNodeOnDom from the ref
        console.log("lastnode", lastNodeOnDomRef.current.uuid)
        const parentNode = lastNodeOnDomRef.current
        if (!parentNode) {
            console.error(`Parent node not found. This should not happen.`);
            return; // Return if the parent isn't found
        }

        // Link the new node to its parent and vice versa
        node.parent = parentNode;
        parentNode.children.set(node.uuid, node);
        console.log(`Node added: ${node.uuid.slice(-14)}, Parent: ${parentNode.uuid.slice(-14)}`);

        // Update the nodes ref
        nodes.current = updatedNodes;

        // Update the lastNodeOnDom ref
        lastNodeOnDomRef.current = node;
        console.log("lastNodeOnDom", lastNodeOnDomRef.current.uuid.slice(-14));

        console.log(`MindMap (${sessionId}):`);

        // update the UI
        // updateMindMapUI();
    };

    const printMindMap = () => {
        console.log(defaultHead.children.forEach((np) => { console.log(np.children) }));
    }

    return sessionId ? (
        <MindMapContext.Provider value={{ sessionId, addChatNodePair, nodes: nodes.current, lastNodeOnDom: lastNodeOnDomRef.current }}>
            {children}
        </MindMapContext.Provider>
    ) : (
        null // or some placeholder/loading component until sessionId is available
    );
};

export const useMindMap = () => {
    const context = useContext(MindMapContext);
    if (context === undefined) {
        throw new Error('useMindMap must be used within a MindMapProvider');
    }
    return context;
};

export default MindMapProvider;