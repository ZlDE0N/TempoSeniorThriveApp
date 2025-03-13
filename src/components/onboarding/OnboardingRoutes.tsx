import { Route, Routes } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import ExpectationScreen from "./ExpectationScreen";
import ProcessExplanation from "./ProcessExplanation";

import Name from "./questions/Name";

export default function OnboardingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/expectations" element={<ExpectationScreen />} />
      <Route path="/process" element={<ProcessExplanation />} />
      <Route path="/name" element={<Name />} />
    </Routes>
  );
}
