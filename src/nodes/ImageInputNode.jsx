import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

const ImageInputNode = ({ data }) => {
  const [image, setImage] = useState(null);
  const onImageChange = useCallback(
    (event) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        data.onImageUpload(file);
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        }
        reader.readAsDataURL(file);
      }
    },
    [data]
  );

  return (
    <div>
      <input type="file" accept="image/*" onChange={onImageChange} />
    
      {image && <img src={image} alt="uploaded" style={{ width: "100px" }} />}
      <Handle type="source" position={Position.right} />
    </div>
  );
};

ImageInputNode.propTypes = {
  data: PropTypes.shape({
    onImageUpload: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImageInputNode;
