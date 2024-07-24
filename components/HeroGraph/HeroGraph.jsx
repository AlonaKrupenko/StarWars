import { ReactFlow, Controls, Background } from "@xyflow/react";

const HeroGraph = ({ nodes, edges }) => {
  return (
    <div style={{ height: 500 }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default HeroGraph;
