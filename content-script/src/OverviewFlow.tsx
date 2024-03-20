import { useState, useCallback } from 'react';
import ReactFlow, {
        addEdge,
        FitViewOptions,
        applyNodeChanges,
        applyEdgeChanges,
        Node,
        Edge,
        OnNodesChange,
        OnEdgesChange,
        OnConnect,
        DefaultEdgeOptions,
        NodeTypes,
        ReactFlowInstance,
        useReactFlow,
        useNodesState,
        useEdgesState,
} from 'reactflow';

import { ChatNodePair } from './MindMapProvider';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';

interface ChatNodePairEdge { }
const nodeTypes = {
        custom: CustomNode,
};

const onInit = (reactFlowInstance: ReactFlowInstance<ChatNodePair, ChatNodePairEdge>) => console.log('flow loaded:', reactFlowInstance);

const initFlowNodes: Node[] = [
        {
                id: 'headChatNode',
                type: 'dummy',
                data: {
                        label: 'headChatNode',
                },
                position: { x: 250, y: 0 },
                // hidden: true,
        },
        {
                id: 'systemChatNode',
                type: 'system',
                data: {
                        label: 'systemChatNode',
                },
                position: { x: 250, y: 30 },
        }
];

const initFlowEdges: Edge[] = [
        { id: 'e1-2', source: 'headChatNode', target: 'systemChatNode', animated: true },
];

const OverviewFlow = () => {
        const [nodes, setNodes, onNodesChange] = useNodesState(initFlowNodes);
        const [edges, setEdges, onEdgesChange] = useEdgesState(initFlowEdges);
        const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]); // useCallback caches the function used for the state changes

        return (
                <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={onInit}
                        fitView
                        attributionPosition="top-right"
                        nodeTypes={nodeTypes}
                />
        );
};

export default OverviewFlow;
