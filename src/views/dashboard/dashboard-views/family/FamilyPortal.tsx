import React from 'react';
// import VitalsView from '../vitals/VitalsView';
// import MedicationList from '../medications/MedicationList';
// import ActivityList from '../activities/ActivityList';
// import DocumentList from '../documents/DocumentList';
// import SocialList from '../social/SocialList';
// import SupplyList from '../supplies/SupplyList';
import FamilyDashboard from './FamilyDashboard';
import CareCircle from './CareCircle';
import FamilyCalendar from './FamilyCalendar';
// import FoodDeliveryList from '../food/FoodDeliveryList';
// import RideServicesList from '../rides/RideServicesList';
// import PetDashboard from '../pets/PetDashboard';
// import FoodAndRecipes from '../food/FoodAndRecipes';
import MessageCenter from './MessageCenter';
import FamilyUpdates from './FamilyUpdates';
import PhotoGallery from './PhotoGallery';
import DocumentCenter from './DocumentCenter';

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
      case 'vitals':
        // return <VitalsView />;
      case 'medications':
        // return <MedicationList />;
      case 'activities':
        // return <ActivityList />;
      case 'social':
        // return <SocialList />;
      case 'supplies':
        // return <SupplyList />;
      case 'care-circle':
        // return <CareCircle />;
      case 'documents':
        // return <DocumentCenter />;
      case 'messages':
        // return <MessageCenter />;
      case 'updates':
        // return <FamilyUpdates />;
      case 'photos':
        // return <PhotoGallery />;
      case 'food-delivery':
        // return <FoodDeliveryList />;
      case 'recipes':
        // return <FoodAndRecipes />;
      case 'ride-services':
        // return <RideServicesList />;
      case 'pets':
        // return <PetDashboard />;
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