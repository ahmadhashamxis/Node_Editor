
import { useReactFlow } from 'reactflow';
import { useState } from 'react';

const model_NODES = [
  { code: "Od", name: "Object Detection" },
  { code: "Ad", name: "Anomaly Detection" },
];

export default function NodeSelect() {
  const { setNodes } = useReactFlow();
  const [menuOpen, setMenuOpen] = useState(false);

  const onProviderClick = ({ name, code, image}) => {
    const location = Math.random() * 500;

    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${prevNodes.length + 1}`,
        data: { name, code, image},
        type: "modelProvider",
        position: { x: location, y: location },
      },
    ]);
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Add Models
     
        </button>
      </div>

      {menuOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {model_NODES.map((provider) => (
              <button
                key={provider.code}
                onClick={() => onProviderClick(provider)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
              >
                {provider.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
