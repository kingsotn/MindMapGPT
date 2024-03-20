import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { addEdge, Node, Edge, Connection, OnNodesChange, OnEdgesChange, useNodesState, useEdgesState } from 'reactflow';
import { ChatNodePair } from './MindMapProvider';
import { initFlowEdges, initFlowNodes } from './initialData';
import { ChatNodePairUi } from './initialData';


interface FlowContextValue {
    flowNodes: ChatNodePairUi[];
    setFlowNodes: (nodes: ChatNodePairUi[]) => void;
    onNodesChange: OnNodesChange;
    flowEdges: Edge[];
    setFlowEdges: (flowEdges: Edge[]) => void;
    onEdgesChange: OnEdgesChange;
    onConnect: (connection: Connection) => void;
}

interface FlowProviderProps {
    children: ReactNode;
    initialNodes: ChatNodePairUi[];
    initialEdges: Edge[];
}

const FlowContext = createContext<FlowContextValue | undefined>(undefined);

export const useFlow = (): FlowContextValue => {
    const context = useContext(FlowContext);
    if (context === undefined) {
        throw new Error('useFlow must be used within a FlowProvider');
    }
    return context;
};

export const FlowProvider: React.FC<FlowProviderProps> = ({ children, initialNodes, initialEdges }) => {
    const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(initFlowNodes);
    const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(initFlowEdges);

    const onConnect = useCallback((connection: Connection) => setFlowEdges((eds) => addEdge(connection, eds)), [setFlowEdges]);

    const value: FlowContextValue = { flowNodes, setFlowNodes, onNodesChange, flowEdges, setFlowEdges, onEdgesChange, onConnect };

    return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};
