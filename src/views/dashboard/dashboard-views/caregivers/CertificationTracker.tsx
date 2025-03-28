import React, { useState } from 'react';
import { Award, AlertTriangle, Plus, Calendar, FileText, ExternalLink } from 'lucide-react';
import { useCaregiverPlatformStore } from '../../store/caregiverPlatformStore';
import { useCaregiverStore } from '../../store/caregiverStore';
import Modal from '../Modal';

export default function CertificationTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getActiveCaregiver } = useCaregiverStore();
  const activeCaregiver = getActiveCaregiver();

  if (!activeCaregiver) return null;

  const certifications = activeCaregiver.certifications || [];
  const now = new Date();
  const expiringCerts = certifications.filter(cert => {
    const expiryDate = new Date(cert.expiryDate);
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90; // Show certs expiring within 90 days
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Certifications</h2>
          <p className="text-sm text-gray-500">Track and manage your professional certifications</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </button>
      </div>

      {/* Expiring Certifications Alert */}
      {expiringCerts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <h3 className="text-sm font-medium text-yellow-800">
              Certifications Expiring Soon
            </h3>
          </div>
          <div className="mt-3 space-y-2">
            {expiringCerts.map((cert) => (
              <div key={cert.name} className="flex items-center justify-between text-sm">
                <span className="text-yellow-700">{cert.name}</span>
                <span className="text-yellow-600">Expires {new Date(cert.expiryDate).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary-light">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">{cert.name}</h3>
              </div>
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-2" />
                Issued by {cert.issuedBy}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Issued: {new Date(cert.issuedDate).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Expires: {new Date(cert.expiryDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Certification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Certification"
      >
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Certification Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="e.g., CPR Certification"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issuing Organization
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="e.g., American Red Cross"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verification URL (optional)
            </label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Certificate
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
            >
              Add Certification
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}