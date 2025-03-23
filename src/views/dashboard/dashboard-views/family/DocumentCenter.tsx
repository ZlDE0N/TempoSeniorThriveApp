import React, { useState } from 'react';
import { FileText, Activity, Heart, Pill, Clock, Download, Share2, Plus, AlertTriangle, ExternalLink } from 'lucide-react';
// import { useDocumentStore } from '../../store/documentStore';
// import { useUserStore } from '../../store/userStore';
// import DocumentPreview from '../documents/DocumentPreview';
// import DocumentUploadModal from '../documents/DocumentUploadModal';
// import { formatDateTime } from '../../utils/dateUtils';

export default function DocumentCenter() {
  // const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  // const [isUploadOpen, setIsUploadOpen] = useState(false);
  // const [selectedDocument, setSelectedDocument] = useState<any>(null);
  // const { documents } = useDocumentStore();
  // const { activeProfile } = useUserStore();

  // // Group documents by category for better organization
  // const documentGroups = {
  //   healthcare: {
  //     title: 'Health & Medical',
  //     icon: Heart,
  //     color: 'primary',
  //     description: 'Medical records, directives, and health-related documents',
  //     documents: documents.filter(doc => doc.category === 'healthcare')
  //   },
  //   legal: {
  //     title: 'Legal & Insurance',
  //     icon: FileText,
  //     color: 'secondary',
  //     description: 'Legal documents, insurance policies, and official records',
  //     documents: documents.filter(doc => doc.category === 'legal')
  //   },
  //   care: {
  //     title: 'Care Instructions',
  //     icon: Activity,
  //     color: 'accent',
  //     description: 'Care plans, routines, and special instructions',
  //     documents: documents.filter(doc => doc.category === 'care')
  //   }
  // };

  // // Get documents that need attention (expired or require renewal)
  // const attentionDocs = documents.filter(doc => 
  //   doc.requiresRenewal && doc.expiryDate && new Date(doc.expiryDate) <= new Date()
  // );

  // return (
  //   <div className="space-y-6">
  //     <div className="flex justify-between items-center">
  //       <div>
  //         <h2 className="text-2xl font-semibold text-dark">
  //           {activeProfile?.name}'s Documents
  //         </h2>
  //         <p className="text-sm text-gray-500">
  //           Access and manage important documents and records
  //         </p>
  //       </div>
  //       <button
  //         onClick={() => setIsUploadOpen(true)}
  //         className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
  //       >
  //         <Plus className="h-4 w-4 mr-2" />
  //         Add Document
  //       </button>
  //     </div>

  //     {/* Documents Needing Attention */}
  //     {attentionDocs.length > 0 && (
  //       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
  //         <div className="flex items-center mb-3">
  //           <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
  //           <h3 className="text-lg font-medium text-yellow-800">Documents Needing Attention</h3>
  //         </div>
  //         <div className="space-y-3">
  //           {attentionDocs.map(doc => (
  //             <div key={doc.id} className="flex items-center justify-between bg-white rounded-lg p-3">
  //               <div>
  //                 <h4 className="font-medium text-gray-900">{doc.name}</h4>
  //                 <p className="text-sm text-red-600">
  //                   Expired on {new Date(doc.expiryDate!).toLocaleDateString()}
  //                 </p>
  //               </div>
  //               <button
  //                 onClick={() => {
  //                   setSelectedDocument(doc);
  //                   setIsPreviewOpen(true);
  //                 }}
  //                 className="text-primary hover:text-primary-hover font-medium text-sm"
  //               >
  //                 Review
  //               </button>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     )}

  //     {/* Document Categories */}
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //       {Object.entries(documentGroups).map(([key, group]) => {
  //         const Icon = group.icon;
  //         return (
  //           <div key={key} className={`bg-${group.color}-light rounded-lg p-6`}>
  //             <div className="flex items-center space-x-3 mb-4">
  //               <div className="p-2 bg-white rounded-full">
  //                 <Icon className={`h-6 w-6 text-${group.color}`} />
  //               </div>
  //               <div>
  //                 <h3 className="font-medium text-gray-900">{group.title}</h3>
  //                 <p className="text-sm text-gray-600">{group.documents.length} documents</p>
  //               </div>
  //             </div>
  //             <p className="text-sm text-gray-600 mb-4">{group.description}</p>
  //             <div className="space-y-2">
  //               {group.documents.slice(0, 3).map(doc => (
  //                 <button
  //                   key={doc.id}
  //                   onClick={() => {
  //                     setSelectedDocument(doc);
  //                     setIsPreviewOpen(true);
  //                   }}
  //                   className="w-full flex items-center justify-between p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
  //                 >
  //                   <div className="flex items-center">
  //                     <FileText className="h-4 w-4 text-gray-400 mr-2" />
  //                     <span className="text-sm font-medium text-gray-900">{doc.name}</span>
  //                   </div>
  //                   <span className="text-xs text-gray-500">
  //                     {formatDateTime(doc.uploadedAt)}
  //                   </span>
  //                 </button>
  //               ))}
  //               {group.documents.length > 3 && (
  //                 <button className="w-full text-sm text-primary hover:text-primary-hover font-medium">
  //                   View {group.documents.length - 3} more
  //                 </button>
  //               )}
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>

  //     {/* Recent Activity */}
  //     <div className="bg-white rounded-lg shadow">
  //       <div className="px-6 py-4 border-b border-gray-200">
  //         <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
  //       </div>
  //       <div className="divide-y divide-gray-200">
  //         {documents.slice(0, 5).map(doc => (
  //           <div key={doc.id} className="p-6 hover:bg-gray-50">
  //             <div className="flex items-center justify-between">
  //               <div>
  //                 <h4 className="font-medium text-gray-900">{doc.name}</h4>
  //                 <p className="text-sm text-gray-500">
  //                   Added {formatDateTime(doc.uploadedAt)}
  //                 </p>
  //               </div>
  //               <div className="flex items-center space-x-2">
  //                 <button
  //                   onClick={() => {
  //                     setSelectedDocument(doc);
  //                     setIsPreviewOpen(true);
  //                   }}
  //                   className="text-primary hover:text-primary-hover"
  //                 >
  //                   <ExternalLink className="h-5 w-5" />
  //                 </button>
  //               </div>
  //             </div>
  //             {doc.tags && doc.tags.length > 0 && (
  //               <div className="mt-2 flex flex-wrap gap-2">
  //                 {doc.tags.map(tag => (
  //                   <span
  //                     key={tag}
  //                     className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
  //                   >
  //                     {tag}
  //                   </span>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </div>

  //     {/* Help Section */}
  //     <div className="bg-primary-light rounded-lg p-6">
  //       <div className="flex items-center space-x-4">
  //         <div className="p-3 bg-white rounded-full">
  //           <FileText className="h-6 w-6 text-primary" />
  //         </div>
  //         <div>
  //           <h3 className="text-lg font-medium text-primary">Need Help?</h3>
  //           <p className="text-sm text-primary-hover mt-1">
  //             Our care team can assist with document organization and management. Contact us for support.
  //           </p>
  //         </div>
  //       </div>
  //     </div>

  //     {selectedDocument && (
  //       <DocumentPreview
  //         isOpen={isPreviewOpen}
  //         onClose={() => {
  //           setIsPreviewOpen(false);
  //           setSelectedDocument(null);
  //         }}
  //         document={selectedDocument}
  //         onAction={(action) => {
  //           if (action === 'download') {
  //             window.open(selectedDocument.file.url, '_blank');
  //           } else if (action === 'print') {
  //             window.print();
  //           }
  //         }}
  //       />
  //     )}

  //     <DocumentUploadModal
  //       isOpen={isUploadOpen}
  //       onClose={() => setIsUploadOpen(false)}
  //     />
  //   </div>
  // );
}