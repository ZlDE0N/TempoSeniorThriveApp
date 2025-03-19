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
import LivingSituation from "./questions/LivingSituation";
import Health from "./questions/Health";
import Meals from "./questions/Meals";
import MobilityAids from "./questions/MobilityAids";
import Connections from "./questions/Connections";
import MeaningfulConversations from "./questions/MeaningfulConversations";
import OverallMood from "./questions/OverallMood";
import SocialSatisfaction from "./questions/SocialSatisfaction";
import SleepHours from "./questions/SleepHours";
import EverydayTasks from "./questions/EverydayTasks";
import PersonalCare from "./questions/PersonalCare";
import DailyRoutines from "./questions/DailyRoutines";

import MovementConsiderations from "./questions/MovementConsiderations";
import Vision from "./questions/Vision";
import Stability from "./questions/Stability";
import MorningRoutine from "./questions/MorningRoutine";
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
import ImageAnalysis from "./ImageAnalysis";

export default function OnboardingRoutes() {
  return (
    <Routes>
      {/* Welcomiing routes */}
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/expectations" element={<ExpectationScreen />} />
      <Route path="/process" element={<ProcessExplanation />} />

      {/* Personal profile*/ }
      <Route path="/name" element={<Name />} />
      <Route path="/age" element={<Age />} />
      <Route path="/living-situation" element={<LivingSituation />} />
      <Route path="/health" element={<Health />} />

      {/* Transition to daily rhythms */ }
      <Route path="/daily-living" element={<DailyLivingIntroScreen />} />

      {/* Daily rhythms */ }
      <Route path="/morning-routine" element={<MorningRoutine />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/everyday-tasks" element={<EverydayTasks />} />
      <Route path="/daily-routines" element={<DailyRoutines />} />
      <Route path="/personal-care" element={<PersonalCare />} />

      {/* Transition to movement & stability */ }
      <Route
        path="/movement-and-stability"
        element={<MovementStabilityIntroScreen />}
      />

      {/* Movement & stability */ }
      <Route path="/home-movement" element={<HomeMovement />} />
      <Route path="/chair-transfer" element={<ChairTransfer />} />
      <Route path="/mobility-aids" element={<MobilityAids />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/balance-history" element={<BalanceHistory />} />
      <Route path="/balance-followup" element={<BalanceFollowup />} />

      {/* Transition to energy & engagement */ }
      <Route
        path="/energy-and-engagement"
        element={<EnergyEngagementIntroScreen />}
      />

      {/* Energy & engagement */ }
      <Route path="/morning-energy" element={<MorningEnergy />} />
      <Route path="/sleep-hours" element={<SleepHours />} />
      <Route path="/afternoon-energy" element={<AfternoonEnergy />} />
      <Route path="/evening-energy" element={<EveningEnergy />} />

      { /* Transition to support and connections */ }
      <Route
        path="/support-and-connections"
        element={<SupportConnectionsIntroScreen />}
      />

      { /* Support and Connections */ }
      <Route path="/connections" element={<Connections />} />
      <Route path="/meaningful-conversations" element={<MeaningfulConversations />} />
      <Route path="/overall-mood" element={<OverallMood />} />
      <Route path="/social-satisfaction" element={<SocialSatisfaction />} />
      <Route path="/support-access" element={<SupportAccess />} />


      <Route
        path="/movement-considerations"
        element={<MovementConsiderations />}
      />

      { /* Transition to room assessment*/ }
      <Route path="/room-assessment" element={<RoomAssessmentIntroScreen />} />

      { /* Room assessment */ }
      <Route path="/room-selection" element={<RoomSelection />} />
      <Route path="/room-assessment/:roomId" element={<RoomAssessment />} />

      <Route path="/image-analysis/:roomId" element={<ImageAnalysis />} />
    </Routes>
  );
}
