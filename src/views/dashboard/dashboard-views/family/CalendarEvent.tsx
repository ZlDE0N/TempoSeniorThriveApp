import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface CalendarEventProps {
  event: {
    id: string;
    title: string;
    color: string;
    type: string;
  };
  onClick: () => void;
}

export default function CalendarEvent({ event, onClick }: CalendarEventProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`${event.color} text-white text-xs p-1 rounded truncate cursor-pointer hover:opacity-90`}
      title={event.title}
    >
      {event.title}
    </div>
  );
}