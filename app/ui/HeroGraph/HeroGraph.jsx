import { ReactFlow, Controls, Background } from "@xyflow/react";

/**
 * Component that renders a hero graph with nodes and edges.
 * @param {Object} props - The component props.
 * @param {Array} props.nodes - The nodes to be displayed in the graph.
 * @param {Array} props.edges - The edges connecting the nodes in the graph.
 * @returns {JSX.Element} The rendered hero graph component.
 */
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
