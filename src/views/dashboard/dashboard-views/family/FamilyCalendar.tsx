import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Users, MapPin } from 'lucide-react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useActivityStore } from '../../store/activityStore';
import { useSocialStore } from '../../store/socialStore';
import EventModal from './EventModal';
import CalendarEvent from './CalendarEvent';
import CalendarCell from './CalendarCell';

const getEventColor = (type: string) => {
  switch (type) {
    case 'physical-exercise':
    case 'physical-therapy':
      return 'bg-blue-500';
    case 'cognitive-memory':
    case 'cognitive-problem-solving':
      return 'bg-green-500';
    case 'social':
      return 'bg-purple-500';
    case 'medical-visit':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function FamilyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);
  const { activities } = useActivityStore();
  const { activities: socialActivities } = useSocialStore();

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get all events for the current month
  const events = [
    ...activities.map(activity => ({
      id: activity.id,
      title: activity.name,
      start: new Date(activity.timestamp),
      type: activity.type,
      color: getEventColor(activity.type)
    })),
    ...socialActivities.map(activity => ({
      id: activity.id,
      title: activity.type,
      start: new Date(activity.timestamp),
      type: 'social',
      color: 'bg-purple-500'
    }))
  ].filter(event => isSameMonth(event.start, selectedDate));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // Update event date based on the drop target (calendar cell)
      const newDate = new Date(over.id);
      // Here you would update the event's date in your store
      console.log(`Move event ${active.id} to ${format(newDate, 'yyyy-MM-dd')}`);
    }
  };

  const weeks = [];
  let currentWeek = [];
  const firstDayOfMonth = monthStart.getDay();

  // Add padding days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    currentWeek.push(null);
  }

  // Add all days of the month
  daysInMonth.forEach(day => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });

  // Add padding days after the last day of the month
  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }
  weeks.push(currentWeek);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 text-sm text-primary hover:bg-primary-light rounded-md"
            >
              Today
            </button>
            <button
              onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsEventModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-7 gap-px border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="px-4 py-2 text-sm font-medium text-gray-700 text-center">
              {day}
            </div>
          ))}
        </div>

        <DndContext 
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {weeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <CalendarCell
                    key={day ? day.toISOString() : `empty-${dayIndex}`}
                    date={day}
                    events={day ? events.filter(event => isSameDay(event.start, day)) : []}
                    isCurrentMonth={day ? isSameMonth(day, selectedDate) : false}
                    onEventClick={(eventId) => {
                      // Handle event click
                      console.log('Event clicked:', eventId);
                    }}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </DndContext>
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
}