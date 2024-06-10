import React from "react";
import PropTypes from 'prop-types';

import { Handle, Position, useReactFlow } from "reactflow";

const ModelProvider = ({ data: { name, image }, id }) => {
  return (
    <div>
    <div className="text-center rounded-md w-[200px] items-center flex justify-center h-[200px] bg-gradient-to-br from-blue-200  to-purple-400 p-6 border border-purple-500">
      <h3 className=" text-white text-2xl  ">
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
    image: PropTypes.string.isRequired,
   
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default ModelProvider;

