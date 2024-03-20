import { useState, useCallback, useMemo } from 'react';
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

import Dagre from '@dagrejs/dagre';
import { ChatNodePair } from './MindMapProvider';
// import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import { initFlowEdges, initFlowNodes } from "./initialData"

const onInit = (reactFlowInstance: ReactFlowInstance<ChatNodePair, Edge>) => console.log('flow loaded:', reactFlowInstance);

// // https://reactflow.dev/learn/layouting/layouting#dagre
// const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
// const getLayoutedElements = (nodes: ChatNodePair[], edges: Edge[], options: any) => {
//         g.setGraph({ rankdir: options.direction });

//         edges.forEach((edge) => g.setEdge(edge.source, edge.target));
//         nodes.forEach((node: ChatNodePair) => g.setNode(node.uuid, node));

//         Dagre.layout(g);

//         return {
//                 nodes: nodes.map((node: ChatNodePair) => {
//                         const { x, y } = g.node(node.uuid);

//                         return { ...node, position: { x, y } };
//                 }),
//                 edges,
//         };
// };

// const LayoutFlow = () => {
//         const { fitView } = useReactFlow();
//         const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//         const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//         const onLayout = useCallback(
//                 (direction) => {
//                         const layouted = getLayoutedElements(nodes, edges, { direction });

//                         setNodes([...layouted.nodes]);
//                         setEdges([...layouted.edges]);

//                         window.requestAnimationFrame(() => {
//                                 fitView();
//                         });
//                 },
//                 [nodes, edges]
//         );

//         return (
//                 <ReactFlow
//                         nodes={nodes}
//                         edges={edges}
//                         onNodesChange={onNodesChange}
//                         onEdgesChange={onEdgesChange}
//                         fitView
//                 >
//                         <Panel position="top-right">
//                                 <button onClick={() => onLayout('TB')}>vertical layout</button>
//                                 <button onClick={() => onLayout('LR')}>horizontal layout</button>
//                         </Panel>
//                 </ReactFlow>
//         );
// };


const FlowApp = () => {
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
                // nodeTypes={nodeTypes}
                />
        );
};

export default FlowApp;
