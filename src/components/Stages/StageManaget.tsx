import React, { useState } from "react";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import "./Stagemanager.css"; // Styles for navigation buttons
import { FaArrowRight } from "react-icons/fa";

const StageManager: React.FC = () => {
  const [sceneIndex, setSceneIndex] = useState(0);

  // Array of all stages
  const scenes = [<Stage1 key="stage1" />, <Stage2 key="stage2" />, <Stage3 key="stage3" />];

  // Function to go to the next scene
  const goNext = () => {
    if (sceneIndex < scenes.length - 1) {
      setSceneIndex(sceneIndex + 1);
    }
  };

  return (
    <div className="scene-manager">
      {scenes[sceneIndex]}

      {/* Next Button */}
      <button onClick={goNext} className="next-arrow" disabled={sceneIndex === scenes.length - 1}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default StageManager;
