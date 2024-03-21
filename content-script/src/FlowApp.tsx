// import { useCallback, useEffect, useMemo } from 'react';
// import ReactFlow, {
//         addEdge,
//         Edge,
//         OnConnect,
//         ReactFlowInstance,
//         useNodesState,
//         useEdgesState,
//         ReactFlowProvider,
// } from 'reactflow';

// import { ChatNodePair } from './MindMapProvider';
// import 'reactflow/dist/style.css';
// import { initFlowEdges, initFlowNodes, ChatNodePairUi } from "./initialData"
// import { FlowProvider, useFlow } from "./FlowContext"

// const onInit = (reactFlowInstance: ReactFlowInstance<ChatNodePair, Edge>) => console.log('flow loaded:', reactFlowInstance);

// const FlowApp = () => {
//         const [flowNodes, setNodes, onNodesChange] = useNodesState(initFlowNodes);
//         const [flowEdges, setEdges, onEdgesChange] = useEdgesState(initFlowEdges);
//         const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]); // useCallback caches the function used for the state changes

//         return (
//                 // Use your FlowProvider here to wrap ReactFlow and provide it with the context
//                 <FlowProvider initialNodes={initFlowNodes} initialEdges={initFlowEdges}>
//                         <ReactFlowProvider> {/* This stays to provide React Flow's internal context */}
//                                 <ReactFlow
//                                         nodes={flowNodes}
//                                         edges={flowEdges}
//                                         onNodesChange={onNodesChange}
//                                         onEdgesChange={onEdgesChange}
//                                         onConnect={onConnect}
//                                         onInit={onInit}
//                                         fitView
//                                         attributionPosition="top-right"
//                                 // nodeTypes={nodeTypes}
//                                 />
//                         </ReactFlowProvider>
//                 </FlowProvider>
//         );
// };

// export default FlowApp;
