// import React, { createContext, useContext, useCallback, ReactNode, useEffect } from 'react';
// import ReactFlow, {
//     addEdge, Node, Edge, Connection, OnNodesChange, OnEdgesChange, useNodesState, useEdgesState, ReactFlowProvider, MarkerType,
//     useReactFlow,
//     NodeMouseHandler,
//     OnConnect,
//     ConnectionLineType,
// } from 'reactflow';
// import { ChatNodePair } from './MindMapProvider';
// import { initialEdges, initialNodes } from './initialData';
// import { ChatNodePairUi } from './initialData';
// import { FlowContext } from "./FlowContext"
// import useAutoLayout, { type LayoutOptions } from './useAutoLayout';


// // Provide the custom context around ReactFlow
// export const ProviderFlow: React.FC<ProviderFlowProps> = ({ children }) => {
//     const [flowNodes, SetNodes, onNodesChange] = useNodesState(initialNodes);
//     const [flowEdges, SetEdges, onEdgesChange] = useEdgesState(initialEdges);
//     const onConnect = useCallback((connection: Connection) => SetEdges((eds) => addEdge(connection, eds)), [SetEdges]);

//     useEffect(() => {
//         console.log("Current flow nodes:", flowNodes);
//     }, [flowNodes]);


//     const value = {
//         flowNodes,
//         SetNodes,
//         onNodesChange,
//         flowEdges,
//         SetEdges,
//         onEdgesChange,
//         onConnect,
//         addChildNode,
//     };

//     return (
//         <FlowContext.Provider value={value}>
//             <div className="providerflow">
//                 <ReactFlowProvider>
//                     <div className="reactflow-wrapper">
//                         {children}
//                     </div>
//                 </ReactFlowProvider>
//             </div>
//         </FlowContext.Provider>
//     );
// }

// export default ProviderFlow
