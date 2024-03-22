// import React, { createContext, useContext, useCallback, useEffect } from 'react';
// import ReactFlow, {
//     addEdge,
//     Node,
//     Edge,
//     Connection,
//     OnNodesChange,
//     OnEdgesChange,
//     useNodesState,
//     useEdgesState,
//     ReactFlowProvider,
//     OnConnect
// } from 'reactflow';
// import 'reactflow/dist/style.css'; // Ensure React Flow's styles are imported
// import { initialEdges, initialNodes } from './initialData'; // Ensure these are correctly defined
// import { ChatNodePairUi } from './initialData'; // Ensure these types are correctly defined
// import MindMapProvider, { useMindMap, ChatNode, ChatNodePair } from './MindMapProvider';

// interface FlowContextValue {
//     nodes: ChatNodePairUi[];
//     setNodes: (nodes: ChatNodePairUi[]) => void; // Adjusted SetNodes to setNodes for naming convention
//     onNodesChange: OnNodesChange;
//     edges: Edge[];
//     setEdges: (flowEdges: Edge[]) => void; // Adjusted SetEdges to setEdges for naming convention
//     onEdgesChange: OnEdgesChange;
//     onConnect: (connection: Connection) => void;
//     addChildNode: (node: ChatNodePair) => void;
// }

// const FlowContext = createContext<FlowContextValue | undefined>(undefined);

// export const useFlow = (): FlowContextValue => {
//     const context = useContext(FlowContext);
//     if (context === undefined) {
//         throw new Error('useFlow must be used within a FlowProvider');
//     }
//     return context;
// };

// export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const mindMapInfo = useMindMap();
//     const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//     const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//     const onConnect: OnConnect = useCallback(
//         (connection) => setEdges((eds) => addEdge(connection, eds)),
//         [setEdges]
//     );

//     const addChildNode = useCallback((node: ChatNodePair) => {
//         console.log(">>> Inside addChildNode with", node);

//         if (!node || !node.parent) {
//             console.log("Node data is incomplete or missing");
//             return; // Early return if node data doesn't meet the requirements
//         }

//         const childNode: ChatNodePairUi = {
//             id: node.uuid,
//             data: { ...node, label: node.uuid },
//             position: { x: 0, y: 0 },
//             // style: { opacity: 0 },
//         };

//         const connectingEdge: Edge = {
//             id: `${node.parent}->${node.uuid}`,
//             source: node.parent?.uuid, // Assuming node.parent is a string. If node.parent is an object, adjust accordingly.
//             target: node.uuid,
//             // style: { opacity: 0 },
//         };

//         console.log("newChildNode", childNode);
//         setNodes((currentNodes) => currentNodes.concat([childNode]));
//         setEdges((currentEdges) => currentEdges.concat([connectingEdge]));
//     }, [setNodes, setEdges]);

//     useEffect(() => {
//         {
//             console.log("all nodes:")
//             nodes.forEach((nd) => {
//                 console.log(nd.data.label)
//             })

//             console.log("testing useEffect mindmapinfo")
//             if (mindMapInfo.toAddNode) {
//                 console.log("mindMapInfo.lastNodeOnDom", mindMapInfo.lastNodeOnDom)
//                 const newCNP: ChatNodePair = {
//                     uuid: mindMapInfo.toAddNode.uuid,
//                     children: new Map<string, ChatNodePair>(),
//                     parent: mindMapInfo.lastNodeOnDom,
//                 };

//                 console.log("YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
//                 addChildNode(newCNP)
//             }
//         }
//     }, [mindMapInfo.nodes.size, mindMapInfo.toAddNode])

//     // Prepare the context value
//     const value: FlowContextValue = {
//         nodes,
//         setNodes,
//         onNodesChange,
//         edges,
//         setEdges,
//         onEdgesChange,
//         onConnect,
//         addChildNode,
//     };

//     return (
//         <FlowContext.Provider value={value}>
//             <ReactFlowProvider>
//                 {children}
//             </ReactFlowProvider>
//         </FlowContext.Provider>
//     );
// };