import React, { useState } from 'react';
import { Pill, Clock, Check, X, AlertCircle } from 'lucide-react';
import { useMedicationStore, Medication } from '@/store/dashboard_store/medicationStore';
import { useUserStore } from '@/store/dashboard_store/userStore';
import MedicationModal from './MedicationModal';
import PharmacyList from './PharmacyList';
import { formatDate } from '@/utils/dateUtils';
import { fdaServicesSearch } from '@/services/fdaService';


export default function MedicationList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const { medications, medicationLogs, logMedication } = useMedicationStore();
  const { currentUser, activeProfile } = useUserStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  

  const isFamily = currentUser?.role === 'family';

  const handleLogMedication = (medicationId: string, taken: boolean) => {
    logMedication({
      medicationId,
      timestamp: new Date().toISOString(),
      taken,
      skipped: !taken
    });
  };

  const getTodayStatus = (medication: Medication) => {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = medicationLogs.filter(log => 
      log.medicationId === medication.id && 
      log.timestamp.startsWith(today)
    );

    if (todayLogs.length === 0) return 'pending';
    if (todayLogs.some(log => log.skipped)) return 'skipped';
    if (todayLogs.some(log => log.delayed)) return 'delayed';
    return 'taken';
  };

  // Sort medications by next upcoming time slot
  const sortedMedications = [...medications].sort((a, b) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const aNextSlot = a.timeSlots.find(slot => slot > currentTime) || a.timeSlots[0];
    const bNextSlot = b.timeSlots.find(slot => slot > currentTime) || b.timeSlots[0];
    
    return aNextSlot.localeCompare(bNextSlot);
  });

  const handleSearch = async () => {
    const results = await fdaServicesSearch(searchTerm);
    setSearchResults(results);
  };

  // Filter medications based on their status
  const filteredMedications = sortedMedications.filter(med => {
    const status = getTodayStatus(med);
    return showCompleted ? status !== 'pending' : status === 'pending';
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">
            {isFamily ? `${activeProfile?.name}'s Medications` : 'Medications'}
          </h2>
          <p className="text-sm text-gray-500">
            {showCompleted ? 'Showing completed medications' : 'Showing pending medications'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-sm text-primary hover:text-primary-hover"
          >
            {showCompleted ? 'Show Active' : 'Show Completed'}
          </button>
          {!isFamily && (
            <button
              onClick={() => {
                setSelectedMedication(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Pill className="h-4 w-4 mr-2" />
              Add Medication
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {filteredMedications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No {showCompleted ? 'completed' : 'pending'} medications at this time.
          </div>
        ) : (
          filteredMedications.map((medication) => {
            const status = getTodayStatus(medication);
            return (
              <div
                key={medication.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-${medication.color}-light`}>
                      <Pill className={`h-5 w-5 text-${medication.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-dark">
                        {medication.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {medication.dosage} • {medication.frequency}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        {medication.timeSlots.join(', ')}
                      </span>
                    </div>
                    
                    {status === 'pending' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLogMedication(medication.id, true)}
                          className="p-1 rounded-full text-green-600 hover:bg-green-50"
                          title="Mark as taken"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleLogMedication(medication.id, false)}
                          className="p-1 rounded-full text-red-600 hover:bg-red-50"
                          title="Skip dose"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                    
                    {status === 'taken' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Taken
                      </span>
                    )}
                    
                    {status === 'skipped' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Skipped
                      </span>
                    )}
                    
                    {status === 'delayed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Delayed
                      </span>
                    )}

                    <button
                      onClick={() => {
                        setSelectedMedication(medication);
                        setIsModalOpen(true);
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                      <AlertCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {medication.instructions && (
                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {medication.instructions}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="flex space-x-2 mb-4">
      <input
        type="text"
        className="border px-3 py-2 rounded w-full"
        placeholder="Search for a medication (e.g. Ibuprofen)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover"
      >
        Search
      </button>
    </div>

    {searchResults.length > 0 && (
  <div className="bg-gray-50 p-4 rounded shadow space-y-2">
    <h3 className="text-lg font-semibold">Search Results</h3>
    {searchResults.map((result, index) => (
      <div key={index} className="p-2 border rounded bg-white">
        <p><strong>Name:</strong> {result.openfda.brand_name?.[0] || 'N/A'}</p>
        <p><strong>Purpose:</strong> {result.purpose?.[0] || 'N/A'}</p>
        <p><strong>Usage:</strong> {result.indications_and_usage?.[0] || 'N/A'}</p>
      </div>
    ))}
  </div>
)}


      <PharmacyList />

      <MedicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMedication(null);
        }}
        medication={selectedMedication}
      />
    </div>
  );
}