import { LegalNDA, LegalDocument, LegalDDChecklist, LegalDDItem } from "@/types/legal";
import { LEGAL_DOCUMENT_TYPES } from "./legal-documents";

// Mock NDAs
export const mockNDAs: LegalNDA[] = [
  {
    id: "nda-1",
    companyId: "1",
    buyerId: "buyer-1",
    sellerId: "seller-1",
    status: "signed",
    signedAt: "2024-11-25T10:30:00Z",
    createdAt: "2024-11-20T14:00:00Z",
    updatedAt: "2024-11-25T10:30:00Z",
  },
  {
    id: "nda-2",
    companyId: "2",
    buyerId: "buyer-1",
    sellerId: "seller-2",
    status: "pending_signature",
    createdAt: "2024-11-28T09:00:00Z",
    updatedAt: "2024-11-28T09:00:00Z",
  },
];

// Mock Legal Documents
export const mockLegalDocuments: LegalDocument[] = [
  {
    id: "doc-1",
    companyId: "1",
    documentType: "contrato_social",
    fileUrl: "/mock/contrato-social.pdf",
    fileName: "Contrato_Social_TechFlow.pdf",
    uploadedBy: "seller-1",
    uploadedAt: "2024-11-15T10:00:00Z",
  },
  {
    id: "doc-2",
    companyId: "1",
    documentType: "cnd_federal",
    fileUrl: "/mock/cnd-federal.pdf",
    fileName: "CND_Federal_2024.pdf",
    uploadedBy: "seller-1",
    uploadedAt: "2024-11-16T14:30:00Z",
  },
  {
    id: "doc-3",
    companyId: "1",
    documentType: "cnd_trabalhista",
    fileUrl: "/mock/cnd-trabalhista.pdf",
    fileName: "CND_Trabalhista_2024.pdf",
    uploadedBy: "seller-1",
    uploadedAt: "2024-11-17T09:15:00Z",
  },
];

// Mock DD Checklists
export const mockDDChecklists: LegalDDChecklist[] = [
  {
    id: "checklist-1",
    companyId: "1",
    completionPercentage: 65,
    riskLevel: "medium",
    notes: "Empresa com histórico limpo. Aguardando CND municipal e certidões de processos.",
    lastReviewedBy: "admin-1",
    lastReviewedAt: "2024-11-28T15:00:00Z",
    createdAt: "2024-11-10T10:00:00Z",
    updatedAt: "2024-11-28T15:00:00Z",
  },
  {
    id: "checklist-2",
    companyId: "2",
    completionPercentage: 30,
    riskLevel: "unknown",
    createdAt: "2024-11-20T10:00:00Z",
    updatedAt: "2024-11-20T10:00:00Z",
  },
];

// Generate DD Items for company 1
export const mockDDItems: LegalDDItem[] = LEGAL_DOCUMENT_TYPES.map((docType, index) => {
  let status: LegalDDItem["status"] = "missing";
  let comment: string | undefined = undefined;

  // For company 1, set some as uploaded/approved
  if (docType.code === "contrato_social") {
    status = "approved";
  } else if (docType.code === "cnd_federal") {
    status = "uploaded";
  } else if (docType.code === "cnd_trabalhista") {
    status = "rejected";
    comment = "Documento vencido. Por favor, envie certidão atualizada.";
  }

  return {
    id: `dd-item-${index + 1}`,
    companyId: "1",
    documentType: docType.code,
    required: docType.required,
    status,
    comment,
    updatedAt: "2024-11-28T10:00:00Z",
  };
});

// Helper functions for mock data
export const getNDAById = (id: string) => mockNDAs.find((nda) => nda.id === id);

export const getNDAByCompanyAndBuyer = (companyId: string, buyerId: string) => {
  return mockNDAs.find((nda) => nda.companyId === companyId && nda.buyerId === buyerId);
};

export const getLegalDocumentsByCompany = (companyId: string) => {
  return mockLegalDocuments.filter((doc) => doc.companyId === companyId);
};

export const getDDChecklistByCompany = (companyId: string) => {
  return mockDDChecklists.find((checklist) => checklist.companyId === companyId);
};

export const getDDItemsByCompany = (companyId: string) => {
  return mockDDItems.filter((item) => item.companyId === companyId);
};

// Mock function to create NDA
export const createMockNDA = (companyId: string, buyerId: string, sellerId: string): LegalNDA => {
  const newNDA: LegalNDA = {
    id: `nda-${Date.now()}`,
    companyId,
    buyerId,
    sellerId,
    status: "pending_signature",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockNDAs.push(newNDA);
  return newNDA;
};

// Mock function to sign NDA
export const signMockNDA = (ndaId: string) => {
  const nda = mockNDAs.find((n) => n.id === ndaId);
  if (nda) {
    nda.status = "signed";
    nda.signedAt = new Date().toISOString();
    nda.updatedAt = new Date().toISOString();
  }
  return nda;
};
