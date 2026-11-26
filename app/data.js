// ANGKA.ID — Indonesia in Numbers.
// Every figure below is a published figure from Statistics Indonesia (BPS),
// Bank Indonesia, or the Ministry of Health, labelled with its source and
// year wherever it is shown. Values are the headline published numbers;
// where BPS publishes a revision, the latest release is used.

export const META = {
  country: "Indonesia",
  updated: "26 November 2026",
  currency: "IDR",
  sourcesNote: "Figures: Statistics Indonesia (BPS) unless stated otherwise.",
};

// Population, mid-year estimates, millions (BPS).
export const POPULATION = [
  { year: 2015, value: 255.59 }, { year: 2016, value: 258.71 },
  { year: 2017, value: 261.89 }, { year: 2018, value: 265.02 },
  { year: 2019, value: 268.07 }, { year: 2020, value: 270.20 },
  { year: 2021, value: 272.68 }, { year: 2022, value: 275.77 },
  { year: 2023, value: 278.69 }, { year: 2024, value: 281.60 },
];

// Real GDP growth, % year on year (BPS).
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// CPI inflation, December year on year, % (BPS).
export const INFLATION = [
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
];

// Open unemployment rate (TPT), % (BPS Sakernas).
export const UNEMPLOYMENT = [
  { label: "Feb 2022", value: 5.83 }, { label: "Aug 2022", value: 5.86 },
  { label: "Feb 2023", value: 5.45 }, { label: "Aug 2023", value: 5.32 },
  { label: "Feb 2024", value: 4.82 }, { label: "Aug 2024", value: 4.91 },
  { label: "Feb 2025", value: 4.76 },
];

// Poverty rate, % of population (BPS).
export const POVERTY = [
  { label: "Sep 2019", value: 9.22 }, { label: "Mar 2020", value: 9.78 },
  { label: "Mar 2021", value: 10.14 }, { label: "Sep 2022", value: 9.57 },
  { label: "Mar 2023", value: 9.36 }, { label: "Mar 2024", value: 9.03 },
  { label: "Sep 2024", value: 8.57 }, { label: "Mar 2025", value: 8.47 },
];

// Headline indicators shown as KPI cards.
export const KPIS = [
  { id: "pop", label: "Population", value: "281.6m", delta: "+1.05% on 2023",
    detail: "Mid-year estimate, 2024", source: "BPS, 2024", route: "#/population" },
  { id: "gdp", label: "GDP (nominal)", value: "Rp22,139tn", delta: "+5.03% real growth",
    detail: "Rp78.6m per person, 2024", source: "BPS, 2024", route: "#/economy" },
  { id: "cpi", label: "Inflation (CPI)", value: "1.57%", delta: "Dec 2024, year on year",
    detail: "Inside Bank Indonesia's 2.5% ± 1 target", source: "BPS, Dec 2024", route: "#/prices" },
  { id: "jobs", label: "Unemployment", value: "4.76%", delta: "Lowest in the series",
    detail: "Open unemployment, Feb 2025", source: "BPS Sakernas", route: "#/employment" },
  { id: "poor", label: "Poverty rate", value: "8.47%", delta: "23.85m people",
    detail: "March 2025 — lowest on record", source: "BPS, Mar 2025", route: "#/poverty" },
  { id: "hdi", label: "Human Development Index", value: "75.02", delta: "+0.85 on 2023",
    detail: "Life expectancy 74.23 years", source: "BPS, 2024", route: "#/education" },
];

// GDP by sector, share of GDP 2024, % (BPS).
export const SECTORS = [
  { name: "Manufacturing", share: 18.9 },
  { name: "Trade, hotels & restaurants", share: 13.0 },
  { name: "Agriculture, forestry & fishing", share: 12.5 },
  { name: "Construction", share: 10.0 },
  { name: "Mining & quarrying", share: 8.4 },
  { name: "Transport & storage", share: 6.0 },
  { name: "Information & communication", share: 4.5 },
  { name: "Finance & insurance", share: 4.2 },
  { name: "Other services", share: 22.5 },
];

// Trade, US$ billion (BPS, 2024).
export const TRADE = {
  exports: 264.70, imports: 233.66, surplus: 31.04,
  topExports: [
    { item: "Coal", share: 10.4 }, { item: "Palm oil", share: 9.0 },
    { item: "Iron & steel", share: 6.5 }, { item: "Electrical machinery", share: 4.9 },
    { item: "Nickel products", share: 4.1 },
  ],
};

// Latest releases feed (BPS release calendar, 2024–2025).
export const RELEASES = [
  { date: "Mar 2025", title: "Poverty rate falls to 8.47% — lowest on record", tag: "Poverty" },
  { date: "Feb 2025", title: "Unemployment at 4.76%; labour force 153.05 million", tag: "Employment" },
  { date: "Feb 2025", title: "Economy grows 5.03% in 2024; GDP Rp22,139 trillion", tag: "Economy" },
  { date: "Jan 2025", title: "December inflation 1.57% year on year", tag: "Prices" },
  { date: "Nov 2024", title: "Human Development Index reaches 75.02", tag: "Welfare" },
  { date: "Aug 2024", title: "Exports US$264.7bn in 2024; trade surplus US$31.0bn", tag: "Trade" },
];

// Full indicator index for the data tables page and search.
export const INDICATORS = [
  { name: "Population", value: "281.60 million", year: 2024, source: "BPS", section: "Population" },
  { name: "Population growth", value: "1.05% per year", year: 2024, source: "BPS", section: "Population" },
  { name: "Population density", value: "147.8 people / km²", year: 2024, source: "BPS", section: "Population" },
  { name: "Median age", value: "30.6 years", year: 2024, source: "BPS", section: "Population" },
  { name: "Sex ratio", value: "102.5 males per 100 females", year: 2024, source: "BPS", section: "Population" },
  { name: "Life expectancy at birth", value: "74.23 years", year: 2024, source: "BPS", section: "Health" },
  { name: "Total fertility rate", value: "2.14 children per woman", year: 2024, source: "BPS", section: "Population" },
  { name: "GDP, nominal", value: "Rp22,139.0 trillion", year: 2024, source: "BPS", section: "Economy" },
  { name: "GDP per capita", value: "Rp78.62 million (US$4,844)", year: 2024, source: "BPS", section: "Economy" },
  { name: "Real GDP growth", value: "5.03%", year: 2024, source: "BPS", section: "Economy" },
  { name: "Investment realisation", value: "Rp1,714.2 trillion", year: 2024, source: "BKPM", section: "Economy" },
  { name: "Exports", value: "US$264.70 billion", year: 2024, source: "BPS", section: "Economy" },
  { name: "Imports", value: "US$233.66 billion", year: 2024, source: "BPS", section: "Economy" },
  { name: "Trade balance", value: "US$31.04 billion surplus", year: 2024, source: "BPS", section: "Economy" },
  { name: "CPI inflation (Dec, yoy)", value: "1.57%", year: 2024, source: "BPS", section: "Prices" },
  { name: "Core inflation (Dec, yoy)", value: "2.26%", year: 2024, source: "BPS", section: "Prices" },
  { name: "Rupiah per US dollar (end-year)", value: "Rp16,162", year: 2024, source: "Bank Indonesia", section: "Prices" },
  { name: "Open unemployment rate", value: "4.76%", year: "Feb 2025", source: "BPS Sakernas", section: "Employment" },
  { name: "Labour force", value: "153.05 million", year: "Feb 2025", source: "BPS Sakernas", section: "Employment" },
  { name: "Employed persons", value: "145.77 million", year: "Feb 2025", source: "BPS Sakernas", section: "Employment" },
  { name: "Labour force participation", value: "70.60%", year: "Feb 2025", source: "BPS Sakernas", section: "Employment" },
  { name: "Informal employment share", value: "59.17%", year: "Aug 2024", source: "BPS Sakernas", section: "Employment" },
  { name: "Average monthly wage (employees)", value: "Rp3.23 million", year: "Aug 2024", source: "BPS Sakernas", section: "Employment" },
  { name: "Poverty rate", value: "8.47%", year: "Mar 2025", source: "BPS", section: "Poverty" },
  { name: "People in poverty", value: "23.85 million", year: "Mar 2025", source: "BPS", section: "Poverty" },
  { name: "Poverty line", value: "Rp609,160 per capita / month", year: "Mar 2025", source: "BPS", section: "Poverty" },
  { name: "Gini ratio", value: "0.379", year: "Mar 2025", source: "BPS", section: "Poverty" },
  { name: "Human Development Index", value: "75.02", year: 2024, source: "BPS", section: "Welfare" },
  { name: "Mean years of schooling", value: "9.08 years", year: 2024, source: "BPS", section: "Education" },
  { name: "Expected years of schooling", value: "13.33 years", year: 2024, source: "BPS", section: "Education" },
  { name: "Adult literacy rate (15+)", value: "98.9%", year: 2024, source: "BPS", section: "Education" },
  { name: "Infant mortality rate", value: "15.9 per 1,000 live births", year: 2023, source: "BPS", section: "Health" },
  { name: "Stunting prevalence (under 5)", value: "19.8%", year: 2024, source: "Ministry of Health (SSGI)", section: "Health" },
  { name: "Land area", value: "1,904,569 km²", year: 2024, source: "BPS", section: "Population" },
  { name: "Number of provinces", value: "38", year: 2024, source: "BPS", section: "Regions" },
  { name: "Number of islands", value: "17,380", year: 2024, source: "BPS", section: "Regions" },
];

// Largest provinces by population, 2024 (BPS). Density in people / km².
export const TOP_PROVINCES = [
  { name: "West Java", pop: 49.94, density: 1412 },
  { name: "East Java", pop: 41.81, density: 875 },
  { name: "Central Java", pop: 37.89, density: 1155 },
  { name: "North Sumatra", pop: 15.59, density: 214 },
  { name: "Banten", pop: 12.43, density: 1287 },
  { name: "Jakarta", pop: 10.56, density: 15904 },
  { name: "South Sulawesi", pop: 9.36, density: 200 },
  { name: "Lampung", pop: 9.22, density: 266 },
];

export function seriesInRange(series, fromYear, toYear) {
  return series.filter(function (p) { return p.year >= fromYear && p.year <= toYear; });
}
