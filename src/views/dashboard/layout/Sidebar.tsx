import { Calendar, Heart, Pill, Activity, Phone, AlertTriangle, Users, FileText, Briefcase, LayoutDashboard, FolderArchive, MessageCircle, Star, BarChart2, ShoppingCart, Brain, Target, Award, Camera, UtensilsCrossed, Car, PawPrint as Paw, Book, Palette, UserCog, ClipboardList, AlignCenterVertical as Certificate, TrendingUp, Bell, Clock, Lock, Dumbbell  } from 'lucide-react';
import { useUserStore } from '../../../store/dashboard_store/userStore';
import { motion } from 'framer-motion';


const menuGroups = {
  overview: {
    label: 'Overview',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'goals', icon: Target, label: 'Goals & Progress' }
    ]
  },
  health: {
    label: 'Health & Wellness',
    items: [
      {
        id: 'health',
        icon: Heart,
        label: 'Health',
        subItems: [
          { id: 'health/vitals', icon: Activity, label: 'Vitals' },
          { id: 'Fitness Videos', icon: Dumbbell, label: 'Fitness Videos' },
          { id: 'health/symptoms', icon: AlertTriangle, label: 'Symptoms' },
          { id: 'health/sleep', icon: Calendar, label: 'Sleep' },
          { id: 'health/mood', icon: Star, label: 'Mood' }
        ]
      },
      { id: 'medications', icon: Pill, label: 'Medications' }
    ]
  },
  activities: {
    label: 'Activities & Enrichment',
    items: [
      { id: 'activities', icon: Activity, label: 'Physical Activities' },
      { id: 'cognitive', icon: Brain, label: 'Brain Health' },
      { id: 'art', icon: Palette, label: 'Art Gallery' },
      { id: 'photos', icon: Camera, label: 'Photo Gallery' },
      { id: 'hobbies', icon: Palette, label: 'Hobbies' }
    ]
  },
  social: {
    label: 'Social & Support',
    items: [
      { id: 'social', icon: Users, label: 'Social Circle' },
      { id: 'care-circle', icon: Heart, label: 'Care Circle' },
      { id: 'calendar', icon: Calendar, label: 'Calendar' }
    ]
  },
  services: {
    label: 'Services & Resources',
    items: [
      { id: 'food-delivery', icon: UtensilsCrossed, label: 'Food Delivery' },
      { id: 'recipes', icon: Book, label: 'Recipes' },
      { id: 'ride-services', icon: Car, label: 'Transportation' },
      { id: 'pets', icon: Paw, label: 'Pet Care' },
      { id: 'documents', icon: FolderArchive, label: 'Documents' }
    ]
  }
};

// Caregiver Manager menu items
const managerMenuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'caregivers', icon: Users, label: 'Care Team' },
  { id: 'certifications', icon: Certificate, label: 'Certifications' },
  { id: 'performance', icon: TrendingUp, label: 'Performance' },
  { id: 'quality', icon: Star, label: 'Quality Metrics' },
  { id: 'reports', icon: BarChart2, label: 'Reports' },
  { id: 'documents', icon: FolderArchive, label: 'Documents' }
];

// Regular Caregiver menu items
const caregiverMenuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'shift', icon: Clock, label: 'Current Shift' },
  { id: 'vitals', icon: Heart, label: 'Vitals' },
  { id: 'medications', icon: Pill, label: 'Medications' },
  { id: 'activities', icon: Activity, label: 'Activities' },
  { id: 'incidents', icon: AlertTriangle, label: 'Incidents' },
  { id: 'contacts', icon: Phone, label: 'Contacts' },
  { id: 'social', icon: Users, label: 'Social Activities' },
  { id: 'notes', icon: FileText, label: 'Care Notes' },
  { id: 'supplies', icon: ShoppingCart, label: 'Supplies' },
  { id: 'documents', icon: FolderArchive, label: 'Documents' },
  { id: 'daily', icon: ClipboardList, label: 'Daily Log' }
];

const familyMenuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'vitals', icon: Heart, label: 'Vitals' },
  { id: 'medications', icon: Pill, label: 'Medications' },
  { id: 'Fitness Videos', icon: Dumbbell, label: 'Fitness Videos' },
  { id: 'activities', icon: Activity, label: 'Activities' },
  { id: 'social', icon: Users, label: 'Social' },
  { id: 'photos', icon: Camera, label: 'Photo Gallery' },
  { id: 'updates', icon: Bell, label: 'Updates' },
  { id: 'documents', icon: FolderArchive, label: 'Documents' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'food-delivery', icon: UtensilsCrossed, label: 'Food Delivery' },
  { id: 'recipes', icon: Book, label: 'Recipes' },
  { id: 'ride-services', icon: Car, label: 'Transportation' },
  { id: 'pets', icon: Paw, label: 'Pet Care' }
];

export default function Sidebar() {
  const { currentUser, activeSection, isPremium, setActiveSection } = useUserStore();

  // const renderMenuItem = (item: any, depth = 0) => (
  //   <li key={item.id}>
  //     <button
  //       onClick={() => setActiveSection(item.id)}
  //       className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
  //         activeSection === item.id
  //           ? 'bg-primary-light text-primary'
  //           : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
  //       }`}
  //       style={{ paddingLeft: `${depth * 1 + 1}rem` }}
  //     >
  //       <item.icon className="mr-3 h-5 w-5" />
  //       {item.label}
  //     </button>
  //     {item.subItems && (
  //       <ul className="ml-4 space-y-1 mt-1">
  //         {item.subItems.map((subItem: any) => renderMenuItem(subItem, depth + 1))}
  //       </ul>
  //     )}
  //   </li>
  // );

  const renderMenuItem = (item: any, depth = 0) => {
    const isLocked = !['dashboard', 'calendar'].includes(item.id) && !isPremium;

    return (
      <li key={item.id}>
        <button
          onClick={() => !isLocked && setActiveSection(item.id)}
          className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeSection === item.id
              ? 'bg-primary-light text-primary'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          style={{ paddingLeft: `${depth * 1 + 1}rem` }}
          disabled={isLocked}
        >
          <div className="flex items-center space-x-2">
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {isLocked && (
              <motion.div
    whileHover={{
      y: -2,
      rotate: [0, -10, 10, 0],
      color: '#ef4444' // rojo
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    title="Unlock with ThriveMax"
    className="text-gray-400"
  >
    <Lock className="h-4 w-4" />
  </motion.div>
            )}
          </div>
        </button>
        {item.subItems && (
          <ul className="ml-4 space-y-1 mt-1">
            {item.subItems.map((subItem: any) => renderMenuItem(subItem, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  const renderMenuGroup = (group: any) => (
    <div key={group.label} className="space-y-1">
      <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {group.label}
      </h3>
      <ul className="space-y-1">
        {group.items.map((item: any) => renderMenuItem(item))}
      </ul>
    </div>
  );

  const getMenuContent = () => {
    switch (currentUser?.role) {
      case 'self':
        return Object.values(menuGroups).map(group => renderMenuGroup(group));
      case 'caregiver_manager':
        return (
          <ul className="space-y-1">
            {managerMenuItems.map(item => renderMenuItem(item))}
          </ul>
        );
      case 'caregiver':
        return (
          <ul className="space-y-1">
            {caregiverMenuItems.map(item => renderMenuItem(item))}
          </ul>
        );
      case 'family':
        return (
          <ul className="space-y-1">
            {familyMenuItems.map(item => renderMenuItem(item))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen overflow-y-auto">
      <nav className="mt-8 px-4 space-y-6">
        {getMenuContent()}
      </nav>
    </div>
  );
}