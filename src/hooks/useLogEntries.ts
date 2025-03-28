import { useMemo } from 'react';
import { useMedicationStore } from '../store/medicationStore';
import { useNutritionStore } from '../store/nutritionStore';
import { useActivityStore } from '../store/activityStore';
import { useIncidentStore } from '../store/incidentStore';
import { formatDateTime } from '../utils/dateUtils';

export function useLogEntries(section: string) {
  // Always call all store hooks regardless of section
  const { medicationLogs, medications } = useMedicationStore();
  const { meals } = useNutritionStore();
  const { activities } = useActivityStore();
  const { incidents } = useIncidentStore();

  const entries = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's medication logs
    const todayMedLogs = medicationLogs
      .filter(log => log.timestamp.startsWith(today))
      .map(log => {
        const medication = medications.find(med => med.id === log.medicationId);
        return {
          time: new Date(log.timestamp).toLocaleTimeString('en-US', { 
            hour: 'numeric',
            minute: '2-digit'
          }),
          category: 'Medications',
          description: `${log.taken ? 'Took' : 'Skipped'} ${medication?.name} ${medication?.dosage}`,
          vital: medication?.instructions,
          type: 'medications',
          priority: 2
        };
      });

    // Get today's meal logs
    const todayMealLogs = meals
      .filter(meal => meal.timestamp.startsWith(today))
      .map(meal => {
        const totalCalories = meal.foods.reduce((sum, food) => sum + (food.calories || 0), 0);
        return {
          time: new Date(meal.timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          }),
          category: `${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}`,
          description: meal.foods.map(f => `${f.name} (${f.portion})`).join(', '),
          vital: `${totalCalories} calories${meal.rating ? ` • Rating: ${meal.rating}/5` : ''}`,
          type: 'meals',
          priority: 2
        };
      });

    // Get today's activity logs
    const todayActivityLogs = activities
      .filter(activity => activity.timestamp.startsWith(today))
      .map(activity => ({
        time: new Date(activity.timestamp).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        }),
        category: `${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Activity`,
        description: `${activity.name} (${activity.duration} minutes)`,
        vital: `${activity.intensity ? `Intensity: ${activity.intensity}` : ''}${
          activity.mood ? ` • Mood: ${activity.mood}/5` : ''
        }`,
        type: 'activities',
        priority: 2
      }));

    // Get today's incident logs and pending follow-ups
    const allIncidentLogs = incidents.map(incident => ({
      time: new Date(incident.timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      }),
      category: incident.followUpNeeded && !incident.resolved ? 'Follow-up Required' : 'Incident Report',
      description: incident.description,
      vital: `Severity: ${incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}${
        incident.resolved ? ' • Resolved' : ''
      }${incident.followUpNeeded && !incident.resolved ? ` • ${incident.followUpNotes}` : ''}`,
      type: 'incidents',
      priority: incident.followUpNeeded && !incident.resolved ? 1 : 2,
      severity: incident.severity
    }));

    // Combine all logs and sort by priority (follow-ups first) then time
    const allLogs = [
      ...todayMedLogs,
      ...todayMealLogs,
      ...todayActivityLogs,
      ...allIncidentLogs
    ].sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return b.time.localeCompare(a.time);
    });

    // Filter by section if specified
    return section === 'daily' ? allLogs : allLogs.filter(log => log.type === section);
  }, [section, medicationLogs, medications, meals, activities, incidents]);

  return {
    entries,
    isFiltered: section !== 'daily'
  };
}