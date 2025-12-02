// Legal Module Types

export type NDAStatus = 'draft' | 'pending_signature' | 'signed' | 'cancelled';
export type RiskLevel = 'unknown' | 'low' | 'medium' | 'high';
export type DDItemStatus = 'missing' | 'uploaded' | 'approved' | 'rejected';

export interface LegalNDA {
  id: string;
  companyId: string;
  buyerId: string;
  sellerId: string;
  status: NDAStatus;
  ndaPdfUrl?: string;
  externalSignatureId?: string;
  signedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegalDocument {
  id: string;
  companyId: string;
  documentType: string;
  fileUrl: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface LegalDDChecklist {
  id: string;
  companyId: string;
  completionPercentage: number;
  riskLevel: RiskLevel;
  notes?: string;
  lastReviewedBy?: string;
  lastReviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegalDDItem {
  id: string;
  companyId: string;
  documentType: string;
  required: boolean;
  status: DDItemStatus;
  comment?: string;
  updatedAt: string;
}

export interface DocumentTypeInfo {
  code: string;
  name: string;
  required: boolean;
  description?: string;
}
