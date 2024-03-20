import React, { memo } from 'react';
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
    useNodesState,
    useEdgesState,
    Position,
    Handle
} from 'reactflow';

import { ChatNodePair } from './MindMapProvider';

type CustomNodeProps = {
    id: string;
    data: ChatNodePair;
};

type CustomNode = Node<ChatNodePair>;

const CustomNode: React.FC<CustomNodeProps> = ({ id, data }) => {
    return (
        <div className="custom-node">
            <Handle type="target" position={Position.Top} />
            <div className="custom-node__header">Custom Node: {data.uuid}</div>
            <div className="custom-node__body">
                {/* Example of listing children UUIDs */}
                {Array.from(data.children.values()).map((child, index) => (
                    <div key={index}>Child UUID: {child.uuid}</div>
                ))}
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default memo(CustomNode);
