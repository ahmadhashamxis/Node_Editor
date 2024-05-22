import { useState, useCallback, useEffect } from "react";
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import ImageInputNode from "../nodes/ImageInputNode";
import DetectNode from "../nodes/DetectNode";
import OutputNode from "../nodes/OutputNode";
import axios from "axios";

const nodeTypes = {
  imageInput: ImageInputNode,
  detect: DetectNode,
  output: OutputNode,
};

const Flow = () => {

  const base64ToBlob = (base64Data, contentType = "") => {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "imageInput",
      position: { x: 100, y: 200 },
      data: { onImageUpload: (image) => handleImageUpload(image) },
    },
    {
      id: "2",
      type: "detect",
      position: { x: 400, y: 200 },
      data: {
        image: null,
        onDetection: (detectedImage) => handleDetection(detectedImage),
      },
    },
    {
      id: "3",
      type: "output",
      position: { x: 800, y: 180 },
      data: { detectedImage: null },
    },
  ]);

  const [edges, setEdges] = useState([
    // { id: "e1-2", source: "1", target: "2" },
    // { id: "e2-3", source: "2", target: "3" },
  ]);

  const [result, setResult] = useState(null);

  const onConnect = useCallback((params) => {
    setEdges((prevEdges) => {
      const newEdge = {
        id: params.edgeId,
        source: params.source,
        target: params.target,
      };

      if (params.source === "1" && params.target === "2") {
       
           const sourceNode = nodes.find((node) => node.id === "2");
           const image = sourceNode?.data.image
        triggerBackendRequest(image);
      }

       if (params.source === "2" && params.target === "3") {
        console.log(result)
          handleDetection(result);
       }


      return [...prevEdges, newEdge];
    });
  }, [nodes, result]);


  useEffect(() => {
    console.log(nodes)
  }, [nodes])

  const handleImageUpload = (image) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "2") {
          node.data = { ...node.data, image: image };
        }
        return node;
      })
    );
  };

  const handleDetection = (detectedImage) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "3") {
          node.data = { ...node.data, detectedImage: detectedImage };
        }
        return node;
      })
    );
  };

  const triggerBackendRequest = (image) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      axios
        .post("http://localhost:5000/detect", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const detectedImageBlob = base64ToBlob(
            response.data.detectedImage,
            "image/jpeg"
          );
          const detectedImageUrl = URL.createObjectURL(detectedImageBlob);
          setResult(detectedImageUrl);
        
        })
        .catch((error) => {
          console.error("There was an error detecting objects!", error);
        });
    }
  }

    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
    );


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Flow;

