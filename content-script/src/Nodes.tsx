import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

// Node Props
interface NodesProps {
    appWidth: number;
}

// consts
const snapGrid = [20, 20];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const connectionLineStyle = { stroke: '#fff' };

interface Node {
    id: string;
    position: { x: number; y: number };
    data: { label: string };
}

interface Edge {
    id: string;
    source: string;
    target: string;
}

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const Nodes: React.FC<NodesProps> = ({ appWidth }) => {
    const [curChatNum, setCurChatNum] = useState<number>(1); // inits at 1
    const [userChatNum, setUserChatNum] = useState<number>(2); // init 2
    const [gptChatNum, setGptChatNum] = useState<number>(3); // init 3
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        const updateNodes = (): void => {

            // create a new Node
            const newNode: Node = {
                id: `${curChatNum}`,
                position: { x: 100, y: 200 },
                data: { label: `${curChatNum}` },
            };

            // add edges and nodes
            setNodes((currentNodes) => [...currentNodes, newNode])
            if (nodes.length > 2) {
                // setEdges
            }

            // update states
            setCurChatNum(curChatNum + 1);
        }


    }, [nodes, curChatNum]);


    return (
        <div style={{ width: appWidth, height: window.innerHeight }
        }>
            <ReactFlow nodes={initialNodes} edges={initialEdges} />
        </div>
    );
};

export default Nodes;