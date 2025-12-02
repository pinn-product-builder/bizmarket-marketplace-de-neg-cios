// Chat Response Templates
export const CHAT_RESPONSE_TEMPLATES = {
  greeting: [
    "Olá! Obrigado pelo interesse na {companyName}. Gostaria de agendar uma reunião para discutirmos os detalhes?",
    "Bom dia! Fico feliz com seu contato sobre {companyName}. Posso compartilhar mais informações sobre a empresa.",
    "Olá! Que bom saber do seu interesse. Podemos conversar mais sobre a {companyName}?",
  ],
  scheduling: [
    "Perfeito! Tenho disponibilidade amanhã às 14h ou 16h. Qual horário funciona melhor para você?",
    "Ótimo! Posso fazer uma videochamada esta semana. Me confirme o melhor dia e horário.",
    "Disponibilidade confirmada! Prefere reunião presencial ou online?",
  ],
  documents: [
    "Claro! Após assinar o NDA, posso compartilhar o balanço patrimonial e DRE dos últimos 3 anos.",
    "Os documentos financeiros estão disponíveis mediante assinatura do NDA. Deseja que eu envie o acordo?",
    "Sim! Temos toda documentação organizada. Basta assinar o termo de confidencialidade.",
  ],
  negotiation: [
    "O valor pedido reflete o múltiplo de 3x sobre o faturamento anual, alinhado com o mercado do setor.",
    "Estamos abertos a discutir condições de pagamento. Qual seria sua proposta?",
    "O preço considera todos os ativos, base de clientes e potencial de crescimento. Podemos conversar sobre os detalhes.",
  ],
  thanks: [
    "Por nada! Estou à disposição para qualquer dúvida.",
    "Fico feliz em ajudar! Qualquer coisa, pode entrar em contato.",
    "Disponha! Aguardo seu retorno.",
  ],
};

// Company Description Templates by Sector
export const DESCRIPTION_TEMPLATES: Record<string, Record<string, string>> = {
  Tecnologia: {
    small: "Empresa de tecnologia consolidada com {years} anos de atuação no mercado. Especializada em desenvolvimento de software e soluções digitais, atende clientes de diversos segmentos com foco em inovação e qualidade. Possui equipe técnica qualificada e base de clientes recorrentes.",
    medium: "Líder regional em soluções tecnológicas com {employees} profissionais especializados. Com {years} anos de mercado, desenvolveu metodologias proprietárias e acumula cases de sucesso em projetos de transformação digital. Infraestrutura moderna e processos certificados garantem entregas de alto padrão.",
    large: "Referência nacional no setor de TI com presença em múltiplos estados. Mais de {employees} colaboradores e portfolio diversificado atendendo grandes corporações. Investimentos contínuos em P&D e parcerias estratégicas com players globais. Potencial de expansão internacional demonstrado.",
  },
  Varejo: {
    small: "Empresa varejista estabelecida há {years} anos com forte presença local. Mix de produtos selecionados e atendimento personalizado conquistaram clientela fiel. Operação enxuta com margens saudáveis e oportunidades claras de expansão.",
    medium: "Rede de varejo com {employees} funcionários e múltiplos pontos de venda estrategicamente posicionados. Marca reconhecida regionalmente, sistema de gestão integrado e logística eficiente. Crescimento consistente ano a ano com margem operacional acima da média do setor.",
    large: "Grande rede varejista com operação em {employees} funcionários distribuídos em dezenas de lojas. Presença omnichannel consolidada, centros de distribuição próprios e plataforma de e-commerce robusta. Poder de negociação significativo com fornecedores e economias de escala bem estabelecidas.",
  },
  Indústria: {
    small: "Indústria familiar com {years} anos de tradição e know-how consolidado. Processos produtivos eficientes, equipamentos modernizados e certificações de qualidade. Base de clientes B2B estável com contratos recorrentes.",
    medium: "Indústria de médio porte com {employees} colaboradores e capacidade produtiva instalada otimizada. Atende mercado nacional com portfólio diversificado de produtos. Investimentos recentes em automação e controle de qualidade resultaram em ganhos de produtividade significativos.",
    large: "Complexo industrial com múltiplas plantas e {employees} funcionários. Líder de mercado em seu segmento com marca consolidada. Exporta para diversos países, possui certificações internacionais e investe continuamente em inovação e sustentabilidade.",
  },
  Alimentação: {
    small: "Negócio de alimentação com {years} anos de operação e receitas proprietárias que fidelizam clientes. Localização privilegiada, ambiente acolhedor e padrão de qualidade consistente. Oportunidade de replicação do modelo de sucesso.",
    medium: "Rede de estabelecimentos de alimentação com {employees} funcionários e modelo de negócio validado. Marca reconhecida, padrões operacionais bem definidos e central de compras que garante margens competitivas. Potencial para franquias ou novos pontos próprios.",
    large: "Grupo alimentício com presença nacional e {employees} colaboradores. Portfolio de marcas estabelecidas, indústria própria e rede de distribuição capilarizada. Forte presença digital e programa de fidelidade com milhares de clientes ativos.",
  },
  Saúde: {
    small: "Clínica especializada com {years} anos de atuação e corpo clínico altamente qualificado. Equipamentos modernos, protocolos de atendimento certificados e taxa de satisfação dos pacientes acima de 90%. Base de convênios estabelecida.",
    medium: "Rede de saúde com {employees} profissionais distribuídos em múltiplas unidades. Especialidades complementares, sistema de gestão integrado e certificações de qualidade. Crescimento orgânico consistente e oportunidades de incorporação de novas unidades.",
    large: "Complexo hospitalar de grande porte com {employees} colaboradores e infraestrutura completa. Referência regional em especialidades críticas, acreditações nacionais e internacionais. Pesquisa clínica ativa e programas de ensino médico.",
  },
  Educação: {
    small: "Instituição de ensino com {years} anos de história e metodologia pedagógica diferenciada. Equipe docente qualificada, índices de aprovação acima da média e comunidade escolar engajada. Infraestrutura adequada com potencial de ampliação.",
    medium: "Grupo educacional com {employees} educadores e múltiplas unidades ou modalidades de ensino. Plataforma digital própria, material didático desenvolvido internamente e parcerias com instituições renomadas. Crescimento de matrículas constante.",
    large: "Instituição de ensino de grande porte com {employees} colaboradores e milhares de alunos ativos. Presença em diversos segmentos educacionais, certificações de qualidade e indicadores de desempenho reconhecidos nacionalmente. Plataforma EAD robusta e potencial de expansão geográfica.",
  },
  Logística: {
    small: "Empresa de logística regional com {years} anos de operação. Frota própria bem mantida, centro de distribuição estrategicamente localizado e clientes corporativos com contratos de longo prazo. Tecnologia de rastreamento e gestão de entregas.",
    medium: "Operadora logística com {employees} funcionários e abrangência em múltiplos estados. Frota diversificada, armazéns próprios e sistema WMS implementado. Contratos com grandes varejistas e indústrias garantem receita recorrente previsível.",
    large: "Empresa de logística integrada com {employees} colaboradores e operação nacional. Frota própria de centenas de veículos, rede de centros de distribuição e tecnologia de ponta. Multimodalidade implementada e capacidade de operações complexas.",
  },
  Serviços: {
    small: "Prestadora de serviços estabelecida há {years} anos com expertise reconhecida no mercado. Equipe técnica certificada, carteira de clientes diversificada e receita recorrente. Processos bem documentados e escaláveis.",
    medium: "Empresa de serviços com {employees} profissionais especializados e presença regional consolidada. Contratos de médio e longo prazo com clientes corporativos, metodologias próprias e certificações de qualidade. Margem operacional saudável e baixa inadimplência.",
    large: "Grande prestadora de serviços com {employees} colaboradores e operação nacional. Contratos com grandes corporações, governo e instituições financeiras. Plataforma tecnológica proprietária, processos auditados e potencial de internacionalização.",
  },
  Outro: {
    small: "Empresa consolidada com {years} anos de atuação em seu nicho de mercado. Operação rentável, equipe experiente e oportunidades claras de crescimento. Base de clientes fiel e modelo de negócio validado.",
    medium: "Negócio de médio porte com {employees} colaboradores e posição competitiva estabelecida. Processos maduros, marca reconhecida regionalmente e margens operacionais atrativas. Potencial de expansão geográfica e de linhas de produtos/serviços.",
    large: "Empresa de grande porte com {employees} funcionários e liderança em seu segmento. Operação multi-regional, investimentos em inovação e parcerias estratégicas. Indicadores financeiros robustos e múltiplas avenidas de crescimento.",
  },
};

// Recommendation Reasons
export const RECOMMENDATION_REASONS = [
  "Baseado no seu interesse em {sector}",
  "Similar a {lastViewedCompany}",
  "Popular entre compradores do seu perfil",
  "Faixa de investimento alinhada ao histórico de buscas",
  "Crescimento acima da média do setor",
  "Perfil de risco compatível com suas preferências",
];

// Comparison Insights Templates
export const COMPARISON_INSIGHTS_TEMPLATES = {
  revenueLeader: {
    positive: "{company} apresenta o maior crescimento de faturamento ({growth}%) no período analisado, demonstrando forte tração de mercado e capacidade de escala operacional. Este desempenho está {comparison} a média do setor.",
    concern: "{company} apresentou crescimento de faturamento de {growth}%, que está abaixo das expectativas para empresas deste segmento. Recomenda-se investigar os direcionadores de receita.",
  },
  marginAnalysis: {
    improving: "A margem de lucro melhorou {delta}pp, indicando otimização operacional bem-sucedida. Ganhos de eficiência ou reposicionamento de preços podem estar contribuindo para este resultado positivo.",
    stable: "Margem de lucro manteve-se estável em torno de {margin}%, demonstrando previsibilidade operacional. Para crescimento futuro, avaliar oportunidades de melhoria de mix ou redução de custos.",
    declining: "Atenção: margem de lucro reduziu {delta}pp. Investigar estrutura de custos, pressões competitivas de preço ou ineficiências operacionais antes de prosseguir.",
  },
  riskAssessment: {
    low: "Perfil de risco conservador com documentação completa ({completion}%) e situação jurídica regularizada. Due diligence não identificou pendências materiais.",
    medium: "Risco moderado identificado - alguns documentos pendentes ({completion}% completo), porém sem red flags críticos. Recomenda-se aprofundar análise antes de proposta vinculante.",
    high: "Alto risco identificado - documentação incompleta ({completion}%) ou irregularidades detectadas. Essencial realizar due diligence completo e avaliar impactos antes de prosseguir com a transação.",
  },
  employeeGrowth: {
    healthy: "Crescimento de {growth}% no quadro de funcionários acompanha a expansão da receita, indicando investimento em capacidade operacional e potencial de escala.",
    concern: "Crescimento de funcionários ({growth}%) desalinhado com a evolução da receita pode indicar ineficiências operacionais ou investimentos antecipados. Avaliar ROI da estrutura.",
  },
  overall: "Considerando os pesos configurados ({financialWeight}% financeiro, {operationalWeight}% operacional, {legalWeight}% jurídico), {topCompany} apresenta o melhor equilíbrio entre retorno potencial e perfil de risco para investidores focados nesta configuração.",
};

// Executive Summary Templates
export const EXECUTIVE_SUMMARY_TEMPLATES = {
  intro: "{companyName} é uma empresa {sector} estabelecida em {foundationYear}, com faturamento anual de R$ {revenueM}M e equipe de {employees} profissionais.",
  strength: "Destaca-se por {differentials}.",
  opportunity: "Com múltiplo de {multiple}x sobre receita, representa oportunidade de {opportunityType}.",
};

// Semantic Search Mappings
export const SEMANTIC_MAPPINGS: Record<string, any> = {
  "empresa lucrativa": { sortBy: "revenue-high", minMargin: 20 },
  "lucrativa": { sortBy: "revenue-high" },
  "alto faturamento": { sortBy: "revenue-high" },
  "startup em crescimento": { sectors: ["Tecnologia"], growthMin: 30 },
  "startup": { sectors: ["Tecnologia"] },
  "negócio familiar": { employeesMax: 50 },
  "pequena empresa": { employeesMax: 50 },
  "grande empresa": { employeesMin: 100, revenueRange: "10-50" },
  "grande porte": { employeesMin: 100 },
  "baixo investimento": { revenueRange: "0-3" },
  "investimento acessível": { revenueRange: "0-3" },
  "alto potencial": { growthMin: 25, sectors: ["Tecnologia", "Saúde"] },
  "inovadora": { sectors: ["Tecnologia", "Saúde", "Educação"] },
  "tecnologia": { sectors: ["Tecnologia"] },
  "tech": { sectors: ["Tecnologia"] },
  "saúde": { sectors: ["Saúde"] },
  "varejo": { sectors: ["Varejo", "Comércio"] },
  "indústria": { sectors: ["Indústria"] },
  "logística": { sectors: ["Logística"] },
  "educação": { sectors: ["Educação"] },
  "região sudeste": { states: ["sp", "rj", "mg", "es"] },
  "sudeste": { states: ["sp", "rj", "mg", "es"] },
  "sul": { states: ["pr", "sc", "rs"] },
  "são paulo": { states: ["sp"] },
  "sp": { states: ["sp"] },
  "rio": { states: ["rj"] },
  "minas": { states: ["mg"] },
};

// Interest Message Templates
export const INTEREST_MESSAGE_TEMPLATES = [
  "Olá! Tenho interesse em conhecer melhor a {companyName}. Estou buscando oportunidades de investimento no setor de {sector} e gostaria de agendar uma conversa para entender melhor o negócio, suas operações e perspectivas de crescimento.",
  "Bom dia! Vi o anúncio da {companyName} e achei o perfil muito interessante para meu portfólio. Poderia me contar mais sobre a operação atual, motivo da venda e condições propostas? Tenho experiência no setor e busco empresas com perfil similar.",
  "Olá! A {companyName} chamou minha atenção pelo posicionamento no mercado de {sector}. Gostaria de explorar uma possível aquisição e entender melhor os números, equipe e diferenciais competitivos. Podemos agendar uma call inicial?",
];
