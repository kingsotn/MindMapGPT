import React, { createContext, useContext, useCallback } from 'react';
import ReactFlow, { addEdge, Node, Edge, Connection, OnNodesChange, OnEdgesChange, useNodesState, useEdgesState, ReactFlowProvider } from 'reactflow';
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
    addNodeToFlowUi: (node: ChatNodePairUi) => void;
}


// interface FlowProviderProps {
//     children: ReactNode;
//     initialNodes: ChatNodePairUi[];
//     initialEdges: Edge[];
// }

const FlowContext = createContext<FlowContextValue | undefined>(undefined);

export const useFlow = (): FlowContextValue => {
    const context = useContext(FlowContext);
    if (context === undefined) {
        throw new Error('useFlow must be used within a FlowProvider');
    }
    return context;
};


export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(initFlowNodes);
    const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(initFlowEdges);

    const onConnect = useCallback((connection: Connection) => setFlowEdges((eds) => addEdge(connection, eds)), [setFlowEdges]);

    const addNodeToFlowUi = useCallback((node: ChatNodePairUi) => {
        console.log(">>> Inside addNodeToFlowUi with", node)
        setFlowNodes((prevNodes) => [...prevNodes, node]);
    }, [setFlowNodes]);

    const value: FlowContextValue = {
        flowNodes,
        setFlowNodes,
        onNodesChange,
        flowEdges,
        setFlowEdges,
        onEdgesChange,
        onConnect,
        addNodeToFlowUi
    };

    return (
        <FlowContext.Provider value={value}>
            <ReactFlowProvider>
                {children}
            </ReactFlowProvider>
        </FlowContext.Provider>
    );
};

export default FlowProvider
