// ChatNodeContext.tsx

// file contains all the backend properties of ChatNode

// Context allows us to wrap all the functions of ChatNode that can be accessed in other components

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from './SessionProvider';


type Role = "User" | "Assistant";

interface ChatNode {
    // given
    uuid: string;
    conversationTurn: number;
    role?: Role; // user | assistant
    content?: string;

    // set
    children: Map<string, ChatNode>; // {uuid : ChatNode}
    parent?: ChatNode; // Optional reference to the parent node
}

interface MindMapContextType {
    sessionId: string;
    nodes: Map<string, ChatNode>;
    addChatNode: (node: ChatNode) => void;
    lastNodeOnDom: ChatNode | null; // whatever is the latest on the DOM
}

const MindMapContext = createContext<MindMapContextType | undefined>(undefined);


// when the user types their first chat->
// i want to init the MindMap with a dummy root, then add that ChatNode to the mindmap


// const [curNode, setCurNode] = useState(during init, we get the root node of the current mindMap);
// const [curMindMap, setCurMindMap] = useState(getCurrentMindMap())

// const [chatNodes, setChatNodes] = useState<ChatNode[]>([]);

// const getCurrentMindMap() {
//     // creates a new mindMap if mindMap does not exist yet in database
//     // otherwise returns the current mindMap-
// }

// // implement parse DOM to put into ChatNode

// function parseDomToNode() {
// }


// Editing: listen to DOM changes. set Current Node to that node. if dom dissapears then set Current Node to latest node in the chat
// NewChat: latestChat is the last chat in the DOM. directly add the new node to that.
// Therefore this requires us to have a parentNOde. root points to a dummy Node

const MindMapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { sessionId } = useSession();
    const [nodes, setNodes] = useState<Map<string, ChatNode>>(new Map());
    const [lastNodeOnDom, setLastNodeOnDom] = useState<ChatNode | null>(null);
    const [currentNodeOnUi, setCurrentNodeOnUi] = useState<ChatNode | null>(null);

    // Initialize the mind map with a dummy parentNode upon the first user chat
    useEffect(() => {
        const dummyRoot: ChatNode = {
            uuid: 'dummy-root', // A fixed uuid for the dummy parent
            content: 'Initial Node',
            children: new Map(),
            conversationTurn: 1
        };
        setNodes(new Map([[dummyRoot.uuid, dummyRoot]]));
        setLastNodeOnDom(dummyRoot); // Assuming this gets updated as real nodes are added
        setCurrentNodeOnUi(null); // init no nodes
    }, []); // Empty dependency array ensures this runs once on mount

    const addChatNode = (node: ChatNode) => {
        setNodes(prevNodes => { //functional update: params previous state, returns new state
            const parentNode = currentNodeOnUi;
            if (parentNode) {
                parentNode.children.set(node.uuid, node);
                node.parent = parentNode;
                node.children = new Map();
            }

            const updatedNodes = new Map(prevNodes);
            updatedNodes.set(node.uuid, node); // add the new node

            if (!!node.parent && node.parent.uuid) {
                console.log(`added: ${node.uuid} \n parent: ${node.parent.uuid}`)
            }
            return updatedNodes;
        });

        // update states
        setLastNodeOnDom(node);
        setCurrentNodeOnUi(node);
    };

    return sessionId ? (
        <MindMapContext.Provider value={{ sessionId, nodes, addChatNode, lastNodeOnDom }}>
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