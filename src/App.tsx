
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/Welcome/WelcomeTeacher";
import SceneManager from "./components/Stages/StageManager"; // Assuming this exists
import SignInForm from "./components/forms/SignInForm";
import Onboarding from "./components/Welcome/Onboarding";
import SignUpForm from "./components/forms/SignUpForm";
import AppLayout from "./components/Dashboard/Layout";
import Home from "./components/pages/Home";
import CreateGroupPage from "./components/groups/CreateGroup";
import RollCallPage from "./components/lessons/RollCall";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route Component={AppLayout} >
          <Route path="/dashboard" element={<Home/>} />
          <Route path ='/create_group' element={<CreateGroupPage/>} />
          <Route path="/lesson" element={<RollCallPage/>} />

        </Route>
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