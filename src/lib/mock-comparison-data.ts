// Mock historical data for company metrics
export interface HistoricalData {
  period: string;
  revenue: number;
  employees: number;
  profitMargin: number;
}

export const getCompanyHistoricalData = (companyId: string): HistoricalData[] => {
  const historicalData: Record<string, HistoricalData[]> = {
    "1": [
      { period: "2021", revenue: 3.2, employees: 25, profitMargin: 18 },
      { period: "2022", revenue: 4.0, employees: 35, profitMargin: 22 },
      { period: "2023", revenue: 4.5, employees: 40, profitMargin: 24 },
      { period: "2024", revenue: 5.0, employees: 45, profitMargin: 25 },
    ],
    "2": [
      { period: "2021", revenue: 8.5, employees: 95, profitMargin: 12 },
      { period: "2022", revenue: 10.0, employees: 105, profitMargin: 15 },
      { period: "2023", revenue: 11.2, employees: 115, profitMargin: 17 },
      { period: "2024", revenue: 12.0, employees: 120, profitMargin: 18 },
    ],
    "3": [
      { period: "2021", revenue: 1.5, employees: 15, profitMargin: 20 },
      { period: "2022", revenue: 2.0, employees: 22, profitMargin: 24 },
      { period: "2023", revenue: 2.6, employees: 30, profitMargin: 28 },
      { period: "2024", revenue: 3.0, employees: 35, profitMargin: 30 },
    ],
    "4": [
      { period: "2021", revenue: 6.0, employees: 65, profitMargin: 16 },
      { period: "2022", revenue: 6.8, employees: 72, profitMargin: 18 },
      { period: "2023", revenue: 7.5, employees: 78, profitMargin: 19 },
      { period: "2024", revenue: 8.0, employees: 80, profitMargin: 20 },
    ],
    "5": [
      { period: "2021", revenue: 12.0, employees: 80, profitMargin: 10 },
      { period: "2022", revenue: 13.0, employees: 85, profitMargin: 12 },
      { period: "2023", revenue: 14.2, employees: 90, profitMargin: 14 },
      { period: "2024", revenue: 15.0, employees: 95, profitMargin: 15 },
    ],
    "6": [
      { period: "2021", revenue: 2.0, employees: 30, profitMargin: 20 },
      { period: "2022", revenue: 2.8, employees: 42, profitMargin: 24 },
      { period: "2023", revenue: 3.5, employees: 52, profitMargin: 26 },
      { period: "2024", revenue: 4.0, employees: 60, profitMargin: 28 },
    ],
  };

  return historicalData[companyId] || historicalData["1"];
};

// Get combined data for multiple companies
export const getCombinedHistoricalData = (companyIds: string[]) => {
  const periods = ["2021", "2022", "2023", "2024"];
  
  return periods.map((period) => {
    const dataPoint: any = { period };
    
    companyIds.forEach((id, index) => {
      const companyData = getCompanyHistoricalData(id);
      const periodData = companyData.find((d) => d.period === period);
      
      if (periodData) {
        dataPoint[`revenue${index}`] = periodData.revenue;
        dataPoint[`employees${index}`] = periodData.employees;
        dataPoint[`profitMargin${index}`] = periodData.profitMargin;
      }
    });
    
    return dataPoint;
  });
};

// Color palette for charts
export const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--accent))",
];
