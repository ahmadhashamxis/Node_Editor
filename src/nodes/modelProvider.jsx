import React from "react";
import PropTypes from 'prop-types';

import { Handle, Position, useReactFlow } from "reactflow";




const ModelProvider = ({ data: { name, image }, id }) => {
  return (
    <div>
    <div className="text-center rounded-md w-[200px] h-[200px] bg-gradient-to-br from-blue-200  to-purple-400 p-6 border border-purple-500">
      <h3 className="mt-[40%] text-white text-2xl  ">
      {name}
      </h3>
     
    </div>
     <Handle type="target" position={Position.Left} />
     <Handle type="source" position={Position.Right} />
     </div>
  );
};

ModelProvider.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.instanceOf(File),
    onDetection: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default ModelProvider;

