// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// // import CryptoJS from 'crypto-js';

// const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-secure-key';

// export type DocumentCategory = 'healthcare' | 'legal' | 'care' | 'other';
// export type DocumentType = 
//   | 'advance-directive' | 'medical-poa' | 'dnr' | 'hipaa' | 'medication-list' | 'immunization' | 'test-results'
//   | 'power-of-attorney' | 'guardianship' | 'insurance' | 'social-security' | 'identification'
//   | 'care-plan' | 'emergency-contacts' | 'facility-agreement' | 'service-contract' | 'caregiver-instructions'
//   | 'other';

// export interface Document {
//   id: string;
//   name: string;
//   category: DocumentCategory;
//   type: DocumentType;
//   description?: string;
//   file: {
//     name: string;
//     size: number;
//     type: string;
//     url: string;
//     lastModified: number;
//   };
//   tags?: string[];
//   uploadedAt: string;
//   expiryDate?: string;
//   requiresRenewal?: boolean;
//   version: number;
//   sharedWith?: string[];
//   complianceInfo?: {
//     status: 'compliant' | 'pending' | 'expired' | 'non-compliant';
//     lastReviewDate?: string;
//     nextReviewDate?: string;
//     reviewedBy?: string;
//   };
//   accessLog?: {
//     timestamp: string;
//     userId: string;
//     action: string;
//   }[];
// }

// interface DocumentState {
//   documents: Document[];
//   addDocument: (doc: Omit<Document, 'id'>) => void;
//   updateDocument: (id: string, updates: Partial<Document>) => void;
//   deleteDocument: (id: string) => void;
//   logAccess: (documentId: string, userId: string, action: string) => void;
//   getComplianceReport: () => {
//     compliant: number;
//     pending: number;
//     expired: number;
//     nonCompliant: number;
//     documents: Document[];
//   };
// }

// const encryptData = (data: any) => {
//   return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
// };

// const decryptData = (encryptedData: string) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// };

// export const useDocumentStore = create<DocumentState>()(
//   persist(
//     (set, get) => ({
//       documents: [],

//       addDocument: (doc) => {
//         const id = crypto.randomUUID();
//         const now = new Date().toISOString();
        
//         // Determine initial compliance status
//         const complianceInfo = doc.requiresRenewal && doc.expiryDate
//           ? {
//               status: new Date(doc.expiryDate) > new Date() ? 'compliant' : 'expired',
//               lastReviewDate: now,
//               nextReviewDate: doc.expiryDate
//             }
//           : undefined;

//         set((state) => ({
//           documents: [{
//             ...doc,
//             id,
//             complianceInfo,
//             accessLog: [{
//               timestamp: now,
//               userId: 'system',
//               action: 'created'
//             }]
//           }, ...state.documents]
//         }));
//       },

//       updateDocument: (id, updates) => {
//         set((state) => ({
//           documents: state.documents.map((doc) =>
//             doc.id === id
//               ? {
//                   ...doc,
//                   ...updates,
//                   version: doc.version + 1,
//                   accessLog: [
//                     ...(doc.accessLog || []),
//                     {
//                       timestamp: new Date().toISOString(),
//                       userId: 'system',
//                       action: 'updated'
//                     }
//                   ]
//                 }
//               : doc
//           )
//         }));
//       },

//       deleteDocument: (id) => {
//         set((state) => ({
//           documents: state.documents.filter((doc) => doc.id !== id)
//         }));
//       },

//       logAccess: (documentId, userId, action) => {
//         set((state) => ({
//           documents: state.documents.map((doc) =>
//             doc.id === documentId
//               ? {
//                   ...doc,
//                   accessLog: [
//                     ...(doc.accessLog || []),
//                     {
//                       timestamp: new Date().toISOString(),
//                       userId,
//                       action
//                     }
//                   ]
//                 }
//               : doc
//           )
//         }));
//       },

//       getComplianceReport: () => {
//         const documents = get().documents;
//         const now = new Date();

//         const stats = documents.reduce(
//           (acc, doc) => {
//             if (!doc.complianceInfo) {
//               acc.nonCompliant++;
//             } else if (doc.complianceInfo.status === 'expired' || 
//                      (doc.expiryDate && new Date(doc.expiryDate) < now)) {
//               acc.expired++;
//             } else if (doc.complianceInfo.status === 'pending') {
//               acc.pending++;
//             } else {
//               acc.compliant++;
//             }
//             return acc;
//           },
//           { compliant: 0, pending: 0, expired: 0, nonCompliant: 0 }
//         );

//         return {
//           ...stats,
//           documents: documents.sort((a, b) => {
//             const statusOrder = {
//               expired: 0,
//               'non-compliant': 1,
//               pending: 2,
//               compliant: 3
//             };
//             const aStatus = a.complianceInfo?.status || 'non-compliant';
//             const bStatus = b.complianceInfo?.status || 'non-compliant';
//             return statusOrder[aStatus] - statusOrder[bStatus];
//           })
//         };
//       }
//     }),
//     {
//       name: 'document-storage',
//       storage: createJSONStorage(() => ({
//         setItem: (name, value) => {
//           const encrypted = encryptData(value);
//           localStorage.setItem(name, encrypted);
//         },
//         getItem: (name) => {
//           const encrypted = localStorage.getItem(name);
//           if (!encrypted) return null;
//           try {
//             return decryptData(encrypted);
//           } catch {
//             return null;
//           }
//         },
//         removeItem: (name) => localStorage.removeItem(name)
//       }))
//     }
//   )
// );