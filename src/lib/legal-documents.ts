import { DocumentTypeInfo } from "@/types/legal";

// Standard legal document types for Brazilian companies
export const LEGAL_DOCUMENT_TYPES: DocumentTypeInfo[] = [
  {
    code: "contrato_social",
    name: "Contrato Social",
    required: true,
    description: "Documento de constituição da empresa",
  },
  {
    code: "cnd_federal",
    name: "CND Federal",
    required: true,
    description: "Certidão Negativa de Débitos Federais",
  },
  {
    code: "cnd_trabalhista",
    name: "CND Trabalhista",
    required: true,
    description: "Certidão Negativa de Débitos Trabalhistas",
  },
  {
    code: "cnd_estadual",
    name: "CND Estadual",
    required: true,
    description: "Certidão Negativa de Débitos Estaduais",
  },
  {
    code: "cnd_municipal",
    name: "CND Municipal",
    required: true,
    description: "Certidão Negativa de Débitos Municipais",
  },
  {
    code: "certidao_processos_civeis",
    name: "Certidão Processos Cíveis",
    required: true,
    description: "Certidão de distribuição de processos cíveis",
  },
  {
    code: "certidao_processos_trabalhistas",
    name: "Certidão Processos Trabalhistas",
    required: true,
    description: "Certidão de distribuição de processos trabalhistas",
  },
  {
    code: "contratos_clientes_relevantes",
    name: "Contratos Clientes",
    required: false,
    description: "Contratos com principais clientes",
  },
  {
    code: "contratos_trabalho",
    name: "Contratos de Trabalho",
    required: false,
    description: "Contratos de trabalho dos funcionários chave",
  },
  {
    code: "marcas_patentes_softwares",
    name: "Marcas/Patentes/Softwares",
    required: false,
    description: "Registros de propriedade intelectual",
  },
  {
    code: "licencas_alvaras",
    name: "Licenças e Alvarás",
    required: false,
    description: "Licenças de funcionamento e alvarás",
  },
];

export const getDocumentTypeByCode = (code: string): DocumentTypeInfo | undefined => {
  return LEGAL_DOCUMENT_TYPES.find((doc) => doc.code === code);
};

export const NDA_TEMPLATE = `
TERMO DE CONFIDENCIALIDADE (NDA)
Non-Disclosure Agreement

Pelo presente instrumento particular, as partes abaixo qualificadas:

PARTE DIVULGADORA: O vendedor da empresa objeto deste acordo
PARTE RECEPTORA: O comprador interessado na aquisição

CONSIDERANDO que:

A) A PARTE DIVULGADORA é proprietária de informações confidenciais relacionadas à empresa em negociação;
B) A PARTE RECEPTORA tem interesse em avaliar a aquisição da empresa;
C) Para viabilizar esta análise, faz-se necessário o compartilhamento de informações sensíveis;

RESOLVEM celebrar o presente Acordo de Confidencialidade, mediante as seguintes cláusulas e condições:

CLÁUSULA 1ª - OBJETO
1.1. O presente acordo tem por objeto estabelecer as condições de divulgação e uso de informações confidenciais relacionadas à empresa em processo de venda.

CLÁUSULA 2ª - INFORMAÇÕES CONFIDENCIAIS
2.1. São consideradas confidenciais todas as informações técnicas, comerciais, financeiras, jurídicas e estratégicas relacionadas à empresa, incluindo mas não se limitando a:
   a) Demonstrações financeiras
   b) Contratos comerciais
   c) Lista de clientes e fornecedores
   d) Processos operacionais
   e) Propriedade intelectual
   f) Informações de recursos humanos

CLÁUSULA 3ª - OBRIGAÇÕES DA PARTE RECEPTORA
3.1. A PARTE RECEPTORA compromete-se a:
   a) Manter sigilo absoluto sobre todas as informações recebidas;
   b) Utilizar as informações exclusivamente para análise da aquisição;
   c) Não divulgar as informações a terceiros sem autorização prévia e escrita;
   d) Implementar medidas de segurança adequadas para proteção das informações;
   e) Devolver ou destruir todas as informações caso a negociação não se concretize.

CLÁUSULA 4ª - PRAZO E VIGÊNCIA
4.1. O presente acordo vigorará pelo prazo de 2 (dois) anos a contar da data de assinatura.
4.2. As obrigações de confidencialidade permanecerão em vigor mesmo após o término do acordo.

CLÁUSULA 5ª - PENALIDADES
5.1. O descumprimento das obrigações estabelecidas neste acordo sujeitará a parte infratora ao pagamento de multa e indenização por perdas e danos.

CLÁUSULA 6ª - FORO
6.1. Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias oriundas deste acordo.

E por estarem assim justas e acordadas, as partes assinam o presente instrumento.

___________________________
PARTE DIVULGADORA
(Vendedor)

___________________________
PARTE RECEPTORA
(Comprador)
`;
