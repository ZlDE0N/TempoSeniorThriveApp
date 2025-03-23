import React, { useState } from 'react';
import { Users, Plus, X } from 'lucide-react';
import { useFamilyStore, FamilyMember } from '../../../../store/familyStore';

interface FamilyTreePanelProps {
  onClose: () => void;
  onSelectMember: (member: FamilyMember) => void;
}

const relationOptions = [
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'parent', label: 'Parent' },
  { value: 'child', label: 'Child' },
  { value: 'grandchild', label: 'Grandchild' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'aunt', label: 'Aunt' },
  { value: 'uncle', label: 'Uncle' },
  { value: 'cousin', label: 'Cousin' },
  { value: 'niece', label: 'Niece' },
  { value: 'nephew', label: 'Nephew' },
  { value: 'other', label: 'Other' }
];

export default function FamilyTreePanel({ onClose, onSelectMember }: FamilyTreePanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    relationship: '',
    birthDate: '',
    location: ''
  });

  const { familyMembers, addFamilyMember, deleteFamilyMember } = useFamilyStore();

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.relationship) return;

    addFamilyMember({
      name: newMember.name,
      relationship: newMember.relationship,
      birthDate: newMember.birthDate || undefined,
      location: newMember.location || undefined,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newMember.name)}`
    });

    setNewMember({
      name: '',
      relationship: '',
      birthDate: '',
      location: ''
    });
    setShowAddForm(false);
  };

  // Group family members by relationship
  const groupedMembers = familyMembers.reduce((groups, member) => {
    const group = member.relationship;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(member);
    return groups;
  }, {} as Record<string, FamilyMember[]>);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Family Tree</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-primary hover:text-primary-hover"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddMember} className="mb-6 bg-gray-50 rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newMember.name}
                onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Relationship</label>
              <select
                value={newMember.relationship}
                onChange={(e) => setNewMember(prev => ({ ...prev, relationship: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              >
                <option value="">Select relationship</option>
                {relationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Date (optional)</label>
              <input
                type="date"
                value={newMember.birthDate}
                onChange={(e) => setNewMember(prev => ({ ...prev, birthDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location (optional)</label>
              <input
                type="text"
                value={newMember.location}
                onChange={(e) => setNewMember(prev => ({ ...prev, location: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="City, Country"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 bg-white text-gray-700 rounded-md text-sm border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-primary text-white rounded-md text-sm"
              >
                Add Member
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {Object.entries(groupedMembers).map(([relationship, members]) => (
          <div key={relationship} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 capitalize">
              {relationship}s
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {members.map(member => (
                <button
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50 text-left group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {member.photoCount} photos
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to remove this family member?')) {
                        deleteFamilyMember(member.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </button>
              ))}
            </div>
          </div>
        ))}

        {familyMembers.length === 0 && !showAddForm && (
          <div className="text-center py-6">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              No family members added yet. Click the plus icon to add someone.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}