import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import VitalCard from './VitalCard';

interface SortableVitalCardProps {
  id: string;
  vital: any;
  time: string;
}

export default function SortableVitalCard({ id, vital, time }: SortableVitalCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="group">
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 p-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      <VitalCard
        icon={vital.icon}
        title={vital.title}
        value={vital.value}
        unit={vital.unit}
        time={time}
        status="normal"
        color={vital.color}
        vitalKey={vital.key}
      />
    </div>
  );
}