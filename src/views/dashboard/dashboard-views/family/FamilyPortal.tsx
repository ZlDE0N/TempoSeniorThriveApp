import React from 'react';
// import VitalsView from '../vitals/VitalsView';
// import MedicationList from '../medications/MedicationList';
// import ActivityList from '../activities/ActivityList';
// import DocumentList from '../documents/DocumentList';
// import SocialList from '../social/SocialList';
// import SupplyList from '../supplies/SupplyList';
import FamilyDashboard from './FamilyDashboard';
import CareCircle from './CareCircle';
// import FamilyCalendar from './FamilyCalendar';
// import FoodDeliveryList from '../food/FoodDeliveryList';
// import RideServicesList from '../rides/RideServicesList';
// import PetDashboard from '../pets/PetDashboard';
// import FoodAndRecipes from '../food/FoodAndRecipes';
import MessageCenter from './MessageCenter';
import FamilyUpdates from './FamilyUpdates';
import PhotoGallery from './PhotoGallery';
import DocumentCenter from './DocumentCenter';
import ActivityList from '../activities/ActivityList';
import Fitness from '../activities/FitnessActivity';

interface FamilyPortalProps {
  section: string;
}

export default function FamilyPortal({ section }: FamilyPortalProps) {
  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <FamilyDashboard />;
      case 'calendar':
        // return <FamilyCalendar />;
        return <div>Medications coming soon</div>;
      case 'vitals':
        // return <VitalsView />;
        return <div>Medications coming soon</div>;
      case 'medications':
        // return <MedicationList />;
        return <div>Medications coming soon</div>;
      case 'Fitness Videos':
        return <Fitness/>;
        
        // return <div>Medications coming soon</div>;
      case 'activities':
        return <ActivityList />;
      case 'social':
        // return <SocialList />;
        return <div>Medications coming soon</div>;
      case 'supplies':
        // return <SupplyList />;
        return <div>Medications coming soon</div>;
      case 'care-circle':
        // return <CareCircle />;
        return <div>Medications coming soon</div>;
      case 'documents':
        // return <DocumentCenter />;
        return <div>Medications coming soon</div>;
      case 'messages':
        // return <MessageCenter />;
        return <div>Medications coming soon</div>;
      case 'updates':
        // return <FamilyUpdates />;
        return <div>Medications coming soon</div>;
      case 'photos':
        // return <PhotoGallery />;
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
      default:
        return <FamilyDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {renderSection()}
    </div>
  );
}