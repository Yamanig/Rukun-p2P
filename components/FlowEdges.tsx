"use client";

import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = Array.from({ length: 8 }, (_, i) => ({
  id: `${i + 1}`,
  position: {
    x: Math.random() * 800,
    y: Math.random() * 600,
  },
  data: { label: '' },
  style: { opacity: 0, width: 1, height: 1 },
}));

const createEdges = (nodes: Node[]): Edge[] => {
  const edges: Edge[] = [];
  nodes.forEach((node, i) => {
    if (i < nodes.length - 1) {
      edges.push({
        id: `e${node.id}-${nodes[i + 1].id}`,
        source: node.id,
        target: nodes[i + 1].id,
        animated: true,
        style: { stroke: '#60A5FA', strokeWidth: 1, opacity: 0.3 },
      });
    }
  });
  return edges;
};

const initialEdges = createEdges(initialNodes);

export function FlowEdges() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          position: {
            x: node.position.x + (Math.random() - 0.5) * 5,
            y: node.position.y + (Math.random() - 0.5) * 5,
          },
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [setNodes]);

  return (
    <div className="absolute inset-0 z-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        fitView
        style={{
          backgroundColor: 'transparent',
        }}
      >
        <Background color="#60A5FA" variant="dots" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}