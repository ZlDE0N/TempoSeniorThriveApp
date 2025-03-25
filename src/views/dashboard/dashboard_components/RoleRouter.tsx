import { useEffect } from 'react';
import { useUserStore } from '../../../store/dashboard_store/userStore';// import { useCaregiverStore } from '../store/caregiverStore';
// import VitalsView from './vitals/VitalsView';
// import MedicationList from './medications/MedicationList';
// import ActivityList from './activities/ActivityList';
// import ContactList from './contacts/ContactList';
// import IncidentList from './incidents/IncidentList';
// import SocialList from './social/SocialList';
// import NoteList from './notes/NoteList';
// import SupplyList from './supplies/SupplyList';
// import DocumentList from './documents/DocumentList';
// import CaregiverDashboard from './caregivers/CaregiverDashboard';
// import CaregiverShiftView from './caregivers/CaregiverShiftView';
// import CertificationTracker from './caregivers/CertificationTracker';
// import PerformanceMetrics from './caregivers/PerformanceMetrics';
// import CaregiverList from './caregivers/CaregiverList';
// import QualityDashboard from './quality/QualityDashboard';
// import ReportingDashboard from './reports/ReportingDashboard';
// import Overview from './dashboard/Overview';
// import CareLog from './CareLog';
// import SelfPortal from './self/SelfPortal';
import FamilyPortal from '../dashboard-views/family/FamilyPortal';
import SelfPortal from '../dashboard-views/self/SelfPortal';

export default function RoleRouter() {
  const { currentUser, activeSection } = useUserStore();

  if (!currentUser) return null;

  if (currentUser.role === 'family') {
    return <FamilyPortal section={activeSection} />;
  }

  
  
  if (currentUser.role === 'self') {
    return <SelfPortal section={activeSection} />;
  }
  
  return (
    <div className="text-center text-gray-500 mt-10">
      No view available for this role.
    </div>
  );
  
  // // Caregiver Manager role
  // if (currentUser.role === 'caregiver_manager') {
  //   switch (activeSection) {
  //     case 'dashboard':
  //       return <CaregiverDashboard />;
  //     case 'caregivers':
  //       return <CaregiverList />;
  //     case 'certifications':
  //       return <CertificationTracker />;
  //     case 'performance':
  //       return <PerformanceMetrics />;
  //     case 'quality':
  //       return <QualityDashboard />;
  //     case 'reports':
  //       return <ReportingDashboard />;
  //     case 'documents':
  //       return <DocumentList />;
  //     default:
  //       return <CaregiverDashboard />;
  //   }
  // }

  // // Regular Caregiver role
  // const currentShift = getCurrentShift();

  // // Force shift view if no active shift
  // if (!currentShift && activeSection !== 'shift') {
  //   return <CaregiverShiftView />;
  // }

  // switch (activeSection) {
  //   case 'dashboard':
  //     return <CaregiverDashboard />;
  //   case 'shift':
  //     return <CaregiverShiftView />;
  //   case 'vitals':
  //     return <VitalsView />;
  //   case 'medications':
  //     return <MedicationList />;
  //   case 'activities':
  //     return <ActivityList />;
  //   case 'incidents':
  //     return <IncidentList />;
  //   case 'contacts':
  //     return <ContactList />;
  //   case 'social':
  //     return <SocialList />;
  //   case 'notes':
  //     return <NoteList />;
  //   case 'supplies':
  //     return <SupplyList />;
  //   case 'documents':
  //     return <DocumentList />;
  //   case 'daily':
  //     return <CareLog section={activeSection} />;
  //   default:
  //     return <CaregiverShiftView />;
  // }
}