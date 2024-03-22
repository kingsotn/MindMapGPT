
import { Node, Edge, } from 'reactflow';
import { ChatNodePair } from './MindMapProvider';

// These are the backend inits of nodes

export const defaultSystem: ChatNodePair = {
    uuid: 'systemChatNode',
    // content: // TODO: this can actually be parsed down the future (system msg)
    parent: null,
    children: new Map<string, ChatNodePair>(),
};

export const defaultHead: ChatNodePair = {
    uuid: 'headChatNode',
    children: new Map<string, ChatNodePair>([[defaultSystem.uuid, defaultSystem]]),
};

// Assign defaultHead as the parent of defaultSystem
defaultSystem.parent = defaultHead;





// These are the UI inits for reactflow

// extend reactflow's Node class with a new type
export interface ChatNodePairUi extends Node {
    data: {
        label: string;
        ChatNodePair?: ChatNodePair;
    }

}

export const initialNodes: ChatNodePairUi[] = [
    {
        id: defaultHead.uuid,
        // type: 'customNode', // Assuming you've registered a custom node type named 'customNode'
        data: {
            ChatNodePair: defaultHead,
            label: "head"
        },
        position: { x: 250, y: 5 },
    },
    {
        id: defaultSystem.uuid,
        // type: 'customNode', // Use the same custom node type for consistency
        data: {
            ChatNodePair: defaultSystem,
            label: "System"
        },
        position: { x: 250, y: 100 },
    },
];

export const initialEdges: Edge[] = [
    { id: 'headChatNode-systemChatNode', source: defaultHead.uuid, target: defaultSystem.uuid, animated: true, type: "simplebezier" },
];

export default { initialNodes, initialEdges, defaultSystem, defaultHead }

