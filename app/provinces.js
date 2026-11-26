// Provincial populations, mid-year 2024 (BPS). Density = population / land area.
// Only the 20 most populous provinces are listed here; the full 38-province
// table is covered by the national totals on the Regions page.
export const PROVINCES = [
  { name: "West Java", pop: 49.94, area: 35378 },
  { name: "East Java", pop: 41.81, area: 47800 },
  { name: "Central Java", pop: 37.89, area: 32801 },
  { name: "North Sumatra", pop: 15.59, area: 72981 },
  { name: "Banten", pop: 12.43, area: 9663 },
  { name: "Jakarta", pop: 10.56, area: 664 },
  { name: "South Sulawesi", pop: 9.36, area: 46717 },
  { name: "Lampung", pop: 9.22, area: 34624 },
  { name: "South Sumatra", pop: 8.94, area: 91592 },
  { name: "Riau", pop: 6.76, area: 87024 },
  { name: "West Kalimantan", pop: 5.78, area: 147307 },
  { name: "West Sumatra", pop: 5.76, area: 42013 },
  { name: "East Nusa Tenggara", pop: 5.66, area: 48718 },
  { name: "West Nusa Tenggara", pop: 5.60, area: 18572 },
  { name: "Aceh", pop: 5.55, area: 57956 },
  { name: "Bali", pop: 4.34, area: 5780 },
  { name: "South Kalimantan", pop: 4.24, area: 38744 },
  { name: "East Kalimantan", pop: 3.95, area: 127347 },
  { name: "Yogyakarta", pop: 3.76, area: 3133 },
  { name: "Jambi", pop: 3.63, area: 50058 },
];

// Largest cities by population, 2024 (BPS).
export const CITIES = [
  { name: "Jakarta", pop: 10.56 },
  { name: "Surabaya", pop: 2.96 },
  { name: "Bandung", pop: 2.53 },
  { name: "Medan", pop: 2.52 },
  { name: "Bekasi", pop: 2.47 },
  { name: "Tangerang", pop: 1.96 },
  { name: "Depok", pop: 1.94 },
  { name: "Semarang", pop: 1.69 },
];

export function density(p) {
  return Math.round((p.pop * 1000000) / p.area);
}
