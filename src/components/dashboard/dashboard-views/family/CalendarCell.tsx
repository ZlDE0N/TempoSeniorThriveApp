import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { format, isToday } from 'date-fns';
import CalendarEvent from './CalendarEvent';

interface CalendarCellProps {
  date: Date | null;
  events: Array<{
    id: string;
    title: string;
    color: string;
    type: string;
  }>;
  isCurrentMonth: boolean;
  onEventClick: (eventId: string) => void;
}

export default function CalendarCell({ date, events, isCurrentMonth, onEventClick }: CalendarCellProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: date ? date.toISOString() : 'empty',
  });

  if (!date) {
    return <div className="h-32 bg-gray-50" />;
  }

  const dayClasses = `relative h-32 bg-white p-2 hover:bg-gray-50 ${
    isCurrentMonth ? '' : 'bg-gray-50'
  } ${isOver ? 'bg-blue-50' : ''} ${isToday(date) ? 'border-2 border-primary' : ''}`;

  return (
    <div ref={setNodeRef} className={dayClasses}>
      <div className={`text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
        {format(date, 'd')}
      </div>
      <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
        {events.map((event) => (
          <CalendarEvent
            key={event.id}
            event={event}
            onClick={() => onEventClick(event.id)}
          />
        ))}
      </div>
    </div>
  );
}