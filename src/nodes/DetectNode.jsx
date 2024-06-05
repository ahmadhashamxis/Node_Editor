import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

const DetectNode = () => {
  return (
    <div>
    <div className="text-center rounded-md w-[200px] h-[200px] bg-gradient-to-br from-blue-200  to-purple-400 p-6 border border-purple-500">
      <h3 className="mt-[40%] text-white text-2xl  ">
        Detection
      </h3>
     
    </div>
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
