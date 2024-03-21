import React, { createContext, useContext, useCallback, ReactNode, useEffect } from 'react';
import ReactFlow, {
    addEdge, Node, Edge, Connection, OnNodesChange, OnEdgesChange, useNodesState, useEdgesState, ReactFlowProvider, MarkerType,
    useReactFlow,
    NodeMouseHandler,
    OnConnect,
    ConnectionLineType,
    FitView
} from 'reactflow';
import { ChatNodePair } from './MindMapProvider';
import { initialEdges, initialNodes } from './initialData';
// import { ChatNodePairUi } from './initialData';
import { FlowProvider } from "./FlowProvider"
import useAutoLayout, { type LayoutOptions } from './useAutoLayout';
import dagreLayout from './algorithms/dagre';
import { ChatNodePairUi } from './initialData';
import { useFlow } from './FlowProvider';

const proOptions = {
    account: 'paid-pro',
    hideAttribution: true,
};

const defaultEdgeOptions = {
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    pathOptions: { offset: 5 },
};

function ReactFlowAutoLayout() {
    const { fitView, addNodes } = useReactFlow();
    // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        onConnect,
        addChildNode, } = useFlow();

    console.log("initing the layout")
    // this hook handles the computation of the layout once the elements or the direction changes
    // const options: LayoutOptions = {
    //     algorithm: 'dagre',
    //     direction: "TB",
    //     spacing: [20, 20],
    // }
    // useAutoLayout(options)

    // // this hook handles the computation of the layout once the elements or the direction changes
    // const addChildNode = useCallback(
    //     (node: ChatNodePair) => {
    //         console.log(">>> Inside addChildNode with", node)

    //         if (!node || !node.uuid) {
    //             console.log("Node data is incomplete or missing");
    //             return; // Early return if node data doesn't meet the requirements
    //         }

    //         const childNode: ChatNodePairUi = {
    //             id: node.uuid,
    //             data: { ...node, label: "node.uuid" },
    //             position: { x: 0, y: 0 }, // no need to pass a position as it is computed by the layout hook
    //             style: { opacity: 0 }
    //         };

    //         const connectingEdge: Edge = {
    //             id: `${node.parent}->${node.uuid}`,
    //             // @ts-ignore
    //             source: node.parent.uuid,
    //             target: node.uuid,
    //             style: { opacity: 0 },
    //         }
    //         console.log("newChildNode", childNode);
    //         setNodes((nodes) => nodes.concat([childNode]));
    //         setEdges((edges) => edges.concat([connectingEdge]));
    //     },
    //     [setNodes, setEdges, nodes.length]
    // );

    // const childNode: ChatNodePair = {
    //     // id: "as;ldfkja;sldfjksal;fs",
    //     uuid: "NEWWWW.uuid",
    //     children: new Map<string, ChatNodePair>(),
    //     // position: { x: 0, y: 0 }, // no need to pass a position as it is computed by the layout hook
    //     // style: { opacity: 0 }
    // };
    // addChildNode(childNode);

    // const onConnect: OnConnect = useCallback(
    //     (connection) => setEdges((eds) => addEdge(connection, eds)),
    //     [setEdges]
    // );

    // every time our nodes change, we want to center the graph again
    useEffect(() => {
        fitView;
    }, [nodes, fitView]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodesDraggable={true}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineType={ConnectionLineType.SmoothStep}
            // proOptions={proOptions}
            zoomOnDoubleClick={false}
            fitView
        />
    );
}

const ReactFlowWrapper = () => {
    return (
        <FlowProvider>
            <ReactFlowAutoLayout />
        </FlowProvider>
    );
};

export default ReactFlowWrapper;
