
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/Welcome/WelcomeTeacher";
import SceneManager from "./components/Stages/StageManager"; // Assuming this exists
import SignInForm from "./components/forms/SignInForm";
import Onboarding from "./components/Welcome/Onboarding";
import SignUpForm from "./components/forms/SignUpForm";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/teacher" element={<WelcomeScreen />} />
        <Route path="/scene" element={<SceneManager />} />
        <Route path='/login' Component={SignInForm}/>
        <Route path='/dashboard' Component={Onboarding} />
        <Route path='/register' Component={SignUpForm}/>
      </Routes>
    </Router>
  );
};

export default App;