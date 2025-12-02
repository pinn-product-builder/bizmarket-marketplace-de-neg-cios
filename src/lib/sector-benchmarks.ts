// Benchmarks médios por setor (escala 0-100)
export interface SectorBenchmark {
  revenue: number;
  profitMargin: number;
  growth: number;
  employees: number;
  maturity: number;
  legalCompliance: number;
  lowRisk: number;
}

export const SECTOR_BENCHMARKS: Record<string, SectorBenchmark> = {
  "Tecnologia": {
    revenue: 55,
    profitMargin: 65,
    growth: 75,
    employees: 50,
    maturity: 45,
    legalCompliance: 80,
    lowRisk: 75,
  },
  "E-commerce": {
    revenue: 60,
    profitMargin: 55,
    growth: 80,
    employees: 55,
    maturity: 40,
    legalCompliance: 75,
    lowRisk: 70,
  },
  "Serviços": {
    revenue: 50,
    profitMargin: 60,
    growth: 55,
    employees: 60,
    maturity: 55,
    legalCompliance: 85,
    lowRisk: 80,
  },
  "Indústria": {
    revenue: 65,
    profitMargin: 50,
    growth: 45,
    employees: 70,
    maturity: 65,
    legalCompliance: 80,
    lowRisk: 75,
  },
  "Varejo": {
    revenue: 58,
    profitMargin: 48,
    growth: 50,
    employees: 65,
    maturity: 50,
    legalCompliance: 75,
    lowRisk: 70,
  },
  "Educação": {
    revenue: 45,
    profitMargin: 55,
    growth: 60,
    employees: 55,
    maturity: 60,
    legalCompliance: 90,
    lowRisk: 85,
  },
  "Saúde": {
    revenue: 62,
    profitMargin: 58,
    growth: 52,
    employees: 68,
    maturity: 58,
    legalCompliance: 95,
    lowRisk: 90,
  },
  "Financeiro": {
    revenue: 70,
    profitMargin: 62,
    growth: 48,
    employees: 62,
    maturity: 70,
    legalCompliance: 95,
    lowRisk: 88,
  },
};

// Retorna o benchmark baseado no setor mais comum das empresas
export const getSectorBenchmark = (sectors: string[]): SectorBenchmark => {
  if (sectors.length === 0) {
    // Benchmark padrão geral
    return {
      revenue: 55,
      profitMargin: 55,
      growth: 55,
      employees: 60,
      maturity: 55,
      legalCompliance: 80,
      lowRisk: 75,
    };
  }

  // Encontra o setor mais comum
  const sectorCount: Record<string, number> = {};
  sectors.forEach((sector) => {
    sectorCount[sector] = (sectorCount[sector] || 0) + 1;
  });

  const mostCommonSector = Object.keys(sectorCount).reduce((a, b) =>
    sectorCount[a] > sectorCount[b] ? a : b
  );

  return SECTOR_BENCHMARKS[mostCommonSector] || SECTOR_BENCHMARKS["Tecnologia"];
};

// Calcula a média dos benchmarks de múltiplos setores
export const getAverageBenchmark = (sectors: string[]): SectorBenchmark => {
  if (sectors.length === 0) {
    return getSectorBenchmark([]);
  }

  const uniqueSectors = Array.from(new Set(sectors));
  const benchmarks = uniqueSectors.map(
    (sector) => SECTOR_BENCHMARKS[sector] || SECTOR_BENCHMARKS["Tecnologia"]
  );

  const avgBenchmark: SectorBenchmark = {
    revenue: 0,
    profitMargin: 0,
    growth: 0,
    employees: 0,
    maturity: 0,
    legalCompliance: 0,
    lowRisk: 0,
  };

  benchmarks.forEach((benchmark) => {
    avgBenchmark.revenue += benchmark.revenue;
    avgBenchmark.profitMargin += benchmark.profitMargin;
    avgBenchmark.growth += benchmark.growth;
    avgBenchmark.employees += benchmark.employees;
    avgBenchmark.maturity += benchmark.maturity;
    avgBenchmark.legalCompliance += benchmark.legalCompliance;
    avgBenchmark.lowRisk += benchmark.lowRisk;
  });

  const count = benchmarks.length;
  Object.keys(avgBenchmark).forEach((key) => {
    avgBenchmark[key as keyof SectorBenchmark] /= count;
  });

  return avgBenchmark;
};
