import { Route, Routes } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import ExpectationScreen from "./ExpectationScreen";
import ProcessExplanation from "./ProcessExplanation";
import TransitionScreen from "./TransitionScreen";
import DailyLivingIntroScreen from "./DailyLivingIntroScreen";
import MovementStabilityIntroScreen from "./MovementStabilityIntroScreen";
import EnergyEngagementIntroScreen from "./EnergyEngagementIntroScreen";
import SupportConnectionsIntroScreen from "./SupportConnectionsIntroScreen";
import RoomAssessmentIntroScreen from "./RoomAssessmentIntroScreen";
import RoomSelection from "./RoomSelection";
import RoomAssessment from "./RoomAssessment";

import Name from "./questions/Name";
import Age from "./questions/Age";
import MobilityAids from "./questions/MobilityAids";
import MovementConsiderations from "./questions/MovementConsiderations";
import Vision from "./questions/Vision";
import Stability from "./questions/Stability";
import Health from "./questions/Health";
import MorningRoutine from "./questions/MorningRoutine";
import Meals from "./questions/Meals";
import Activities from "./questions/Activities";
import HomeMovement from "./questions/HomeMovement";
import ChairTransfer from "./questions/ChairTransfer";
import BalanceHistory from "./questions/BalanceHistory";
import BalanceFollowup from "./questions/BalanceFollowup";
import MorningEnergy from "./questions/MorningEnergy";
import AfternoonEnergy from "./questions/AfternoonEnergy";
import EveningEnergy from "./questions/EveningEnergy";
import FamilyConnections from "./questions/FamilyConnections";
import FriendsNeighbors from "./questions/FriendsNeighbors";
import SupportAccess from "./questions/SupportAccess";

export default function OnboardingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/expectations" element={<ExpectationScreen />} />
      <Route path="/process" element={<ProcessExplanation />} />
      <Route path="/name" element={<Name />} />
      <Route path="/age" element={<Age />} />
      <Route path="/mobility-aids" element={<MobilityAids />} />
      <Route
        path="/movement-considerations"
        element={<MovementConsiderations />}
      />
      <Route path="/vision" element={<Vision />} />
      <Route path="/stability" element={<Stability />} />
      <Route path="/health" element={<Health />} />
      <Route path="/transition" element={<TransitionScreen />} />
      <Route path="/daily-living" element={<DailyLivingIntroScreen />} />
      <Route path="/morning-routine" element={<MorningRoutine />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/activities" element={<Activities />} />
      <Route
        path="/movement-and-stability"
        element={<MovementStabilityIntroScreen />}
      />
      <Route path="/home-movement" element={<HomeMovement />} />
      <Route path="/chair-transfer" element={<ChairTransfer />} />
      <Route path="/balance-history" element={<BalanceHistory />} />
      <Route path="/balance-followup" element={<BalanceFollowup />} />
      <Route
        path="/energy-and-engagement"
        element={<EnergyEngagementIntroScreen />}
      />
      <Route path="/morning-energy" element={<MorningEnergy />} />
      <Route path="/afternoon-energy" element={<AfternoonEnergy />} />
      <Route path="/evening-energy" element={<EveningEnergy />} />
      <Route
        path="/support-and-connections"
        element={<SupportConnectionsIntroScreen />}
      />
      <Route path="/family-connections" element={<FamilyConnections />} />
      <Route path="/friends-and-neighbors" element={<FriendsNeighbors />} />
      <Route path="/support-access" element={<SupportAccess />} />
      <Route path="/room-assessment" element={<RoomAssessmentIntroScreen />} />
      <Route path="/room-selection" element={<RoomSelection />} />
      <Route path="/room-assessment/:roomId" element={<RoomAssessment />} />
    </Routes>
  );
}
