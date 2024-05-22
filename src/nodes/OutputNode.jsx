import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

const OutputNode = ({ data }) => {

  return (
    <div>
      <p>Output</p>
      {data.detectedImage && (
        <img
          src={data.detectedImage}
          alt="Detected"
          style={{ maxWidth: "100%" }}
        />
      )}
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

OutputNode.propTypes = {
  data: PropTypes.shape({
    detectedImage: PropTypes.string,
  }).isRequired,
};

export default OutputNode;
