import { Route, Routes } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import ExpectationScreen from "./ExpectationScreen";
import ProcessExplanation from "./ProcessExplanation";
import PersonalProfile from "./PersonalProfile";
import MovementProfile from "./MovementProfile";
import VisionSafety from "./VisionSafety";
import HealthContext from "./HealthContext";
import TransitionScreen from "./TransitionScreen";

export default function OnboardingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/expectations" element={<ExpectationScreen />} />
      <Route path="/process" element={<ProcessExplanation />} />
      <Route path="/profile" element={<PersonalProfile />} />
      <Route path="/movement" element={<MovementProfile />} />
      <Route path="/vision" element={<VisionSafety />} />
      <Route path="/health" element={<HealthContext />} />
      <Route path="/transition" element={<TransitionScreen />} />
    </Routes>
  );
}
