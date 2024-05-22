import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

const DetectNode = () => {
  return (
    <div>
      <p  className="bg-white p-2 text-black">Detect</p>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

DetectNode.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.instanceOf(File),
    onDetection: PropTypes.func.isRequired,
  }).isRequired,
};

export default DetectNode;
