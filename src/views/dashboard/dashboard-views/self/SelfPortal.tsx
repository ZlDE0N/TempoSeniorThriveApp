import React from 'react';
// import VitalsView from '../vitals/VitalsView';
// import MedicationList from '../medications/MedicationList';
// import ActivityList from '../activities/ActivityList';
// import DocumentList from '../documents/DocumentList';
// import SocialList from '../social/SocialList';
import SelfDashboard from './SelfDashboard';
import VitalsView from '../../dashboard_components/vitals/VitalsView';
import Fitness from '../activities/FitnessActivity';
import GoalsDashboard from './GoalsDashboard';
import HealthDashboard from './HealthDashboard';
import SymptomTracker from './health/SymptomTracker';
import SleepTracker from './health/SleepTracker';
import MoodTracker from './health/MoodTracker';
import MedicationList from '../medications/MedicationList';
// import GoalsDashboard from './GoalsDashboard';
// import CognitiveList from '../cognitive/CognitiveList';
// import CareCircle from '../family/CareCircle';
// import HealthDashboard from './HealthDashboard';
// import FamilyCalendar from '../family/FamilyCalendar';
// import FoodDeliveryList from '../food/FoodDeliveryList';
// import RideServicesList from '../rides/RideServicesList';
// import PetDashboard from '../pets/PetDashboard';
// import HobbyExplorer from '../hobbies/HobbyExplorer';
// import FoodAndRecipes from '../food/FoodAndRecipes';
// import SportsList from './sports/SportsList';
// import ArtGallery from './art/ArtGallery';
// import PhotoGallery from '../family/PhotoGallery';
// import VitalsView from '../../vitals/VitalsView';
// import MedicationList from '../../medications/MedicationList';
// import ActivityList from '../../activities/ActivityList';
// import CognitiveList from '../../dashboard_components/cognitive/CognitiveList';

interface SelfPortalProps {
  section: string;
}

export default function SelfPortal({ section }: SelfPortalProps) {
  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <SelfDashboard />;
      case 'goals':
        return <GoalsDashboard />;
      case 'health':
        return <HealthDashboard />;
      case 'health/vitals':
        return <VitalsView />;
      case 'Fitness Videos':
        return <Fitness/>;
      case 'health/symptoms':
        return <SymptomTracker />;
      case 'health/sleep':
        return <SleepTracker />;
          case 'health/mood':
        return <MoodTracker />;
      case 'medications':
        return <MedicationList />;
      case 'activities':
        // return <ActivityList />;
        return <div>Medications coming soon</div>;
      case 'sports':
        // return <SportsList />;
        return <div>Medications coming soon</div>;
      case 'art':
        // return <ArtGallery />;
        return <div>Medications coming soon</div>;
      case 'photos':
        // return <PhotoGallery />;
        return <div>Medications coming soon</div>;
      case 'cognitive':
        // return <CognitiveList />;
        return <div>Medications coming soon</div>;
      case 'social':
        // return <SocialList />;
        return <div>Medications coming soon</div>;
      case 'calendar':
        // return <FamilyCalendar />;
        return <div>Medications coming soon</div>;
      case 'documents':
        // return <DocumentList />;
        return <div>Medications coming soon</div>;
      case 'care-circle':
        // return <CareCircle />;
        return <div>Medications coming soon</div>;
      case 'food-delivery':
        // return <FoodDeliveryList />;
        return <div>Medications coming soon</div>;
      case 'recipes':
        // return <FoodAndRecipes />;
        return <div>Medications coming soon</div>;
      case 'ride-services':
        // return <RideServicesList />;
        return <div>Medications coming soon</div>;
      case 'pets':
        // return <PetDashboard />;
        return <div>Medications coming soon</div>;
      case 'hobbies':
        // return <HobbyExplorer />;
        return <div>Medications coming soon</div>;
      default:
        return <SelfDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {renderSection()}
    </div>
  );
}