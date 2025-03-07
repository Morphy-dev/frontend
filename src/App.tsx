
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/Welcome/WelcomeTeacher";
import SceneManager from "./components/Stages/StageManager"; // Assuming this exists


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/teacher" element={<WelcomeScreen />} />
        <Route path="/scene" element={<SceneManager />} />
      </Routes>
    </Router>
  );
};

export default App;