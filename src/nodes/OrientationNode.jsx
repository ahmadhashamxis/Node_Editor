import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

const OrientationNode = () => {
  return (
    <div>
    <div className="text-center rounded-md w-[200px] h-[150px] bg-gradient-to-br from-blue-200  to-purple-200 p-6">
      <h3 className="mt-[10%] text-balck text-2xl font-semibold ">
        Orientation Correction
      </h3>
     
    </div>
     <Handle type="target" position={Position.Left} />
     <Handle type="source" position={Position.Right} />
     </div>
  );
};

OrientationNode.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    onDetection: PropTypes.func.isRequired,
  }).isRequired,
};

export default OrientationNode;
